﻿using System;
using WebApi.Dtos;
using WebApi.Entities;
using WebApi.Static;
using WebApi.Mapper;
using Microsoft.Extensions.Configuration;
using System.Text;
using WebApi.Models;
using Newtonsoft.Json;
using System.Security.Cryptography;
using Microsoft.Extensions.Logging;
using WebApi.Models.JwtPayloads;
using WebApi.Repositories;

namespace WebApi.Services
{

    public class AuthenticationService : IAuthenticationService
    {

        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly IMailService _mailService;
        private readonly ILogger _logger;

        private readonly string _clientUrl;

        public AuthenticationService(
            IUserRepository userRepository,
            IJwtService jwtService,
            IConfiguration configuration,
            IMailService mailService,
            ILogger<IAuthenticationService> logger)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _configuration = configuration;
            _mailService = mailService;
            _logger = logger;
            _clientUrl = _configuration.GetSection("Clients").GetValue<string>("WebClient");
        }

        public string CreateToken(string userId)
        {
            var token = _jwtService.CreateToken(userId);
            return token;
        }

        public LoginResponseDto Login(LoginRequestDto loginRequestDto)
        {
            var potentialUser = _userRepository.TryGetUserByName(loginRequestDto.Username);
            if (potentialUser == null)
            {
                return new LoginResponseDto
                {
                    LoginSuccess = LoginResult.WRONG_USERNAME
                };
            }

            var passwordMatch = _userRepository.ValidatePassword(potentialUser, loginRequestDto.Password);

            if (passwordMatch)
            {
                return potentialUser.ConvertToLoginResponseDto();
            }
            else
            {
                return new LoginResponseDto
                {
                    LoginSuccess = LoginResult.WRONG_PASSWORD
                };
            }
        }

        public RegisterResponseDto CreateUser(RegisterRequestDto registerRequestDto)
        {
            var newUser = new WebUser
            {
                UserId = "user:" + string.Format("{0:yyyyMMddHHmmssffff}", DateTime.UtcNow),
                Email = registerRequestDto.Email,
                Firstname = registerRequestDto.Firstname,
                Lastname = registerRequestDto.Lastname,
                Username = registerRequestDto.Username
            };
            var newPw = PasswordHasher.Hash(registerRequestDto.Password);
            newUser.PasswordHash = newPw;

            if (_userRepository.AddUser(newUser))
            {
                SendEmailConfirmationLink(newUser);
                return newUser.ConvertToRegisterResponseDto();
            }

            return new RegisterResponseDto { RegisterSuccess = RegisterResult.UNKNOWN };
        }

        public string GenerateRandomLink()
        {
            byte[] b = new byte[32];
            RandomNumberGenerator.Create().GetNonZeroBytes(b);
            string randomPart = Convert.ToBase64String(b);
            randomPart = randomPart.Replace('/', 'm').Replace('+', 'x');
            string time = Convert.ToBase64String(Encoding.UTF8.GetBytes(string.Format("{0:yyyyMMddHHmmssffff}", DateTime.UtcNow)));
            time = time.Replace('/', 'm').Replace('+', 'x');
            return randomPart + time;
        }

        public bool SendEmailConfirmationLink(WebUser user)
        {
            string link = GenerateRandomLink();
            if (_userRepository.AddConfirmationKey(user, link, ConfirmType.EmailConfirmation))
            {
                string completeLink = _clientUrl + "/account/verify/" + link;
                MailBuilder builder = new MailBuilder(_configuration);
                MailConfirmEmail model = new MailConfirmEmail
                {
                    FirstName = user.Firstname,
                    LastName = user.Lastname,
                    Link = completeLink,
                    To = user.Email,
                    Type = StaticEnums.EMAIL_CONFIRMATION
                };
                return _mailService.Send(builder.CreateMailConfirmEmail(model));
            }
            _logger.LogInformation("Could not save confirmation link {link} for user {user}", link, user);
            return false;
        }

        public bool ConfirmEmail(string link)
        {
            var res = _userRepository.TryUseConfirmationLink(link, ConfirmType.EmailConfirmation);
            if (res.Success != ConfirmKeyUsageSuccess.SUCESS)
            {
                return false;
            }

            _userRepository.SetMailConfirmed(res.WebUser.UserId);

            return true;
        }

        public string GetUserIdFromToken(string token)
        {
            token = token.Replace("Bearer ", "");
            var tokenPayloadStr = token.Split('.')[1];
            var tokenPayloadStrBytes = Base64Url.Decode(tokenPayloadStr);
            var tokenPayloadStrDecoded = Encoding.UTF8.GetString(tokenPayloadStrBytes);
            var userTokenPayload = JsonConvert.DeserializeObject<UserAuthenticationPayload>(tokenPayloadStrDecoded);
            return userTokenPayload.UserID;
        }

        public bool SendResetPasswordMail(string email)
        {
            var randomLink = GenerateRandomLink();
            if (_userRepository.CheckIfEmailExists(email))
            {
                var user = _userRepository.TryGetUserByEmail(email);
                if (_userRepository.AddConfirmationKey(user, randomLink, ConfirmType.PasswordReset, DateTime.Now.AddHours(1)))
                {
                    string completeLink = _configuration.GetSection("Links").GetValue<string>("PasswordReset") + "/" + randomLink;
                    MailBuilder builder = new MailBuilder(_configuration);
                    MailConfirmEmail model = new MailConfirmEmail
                    {
                        FirstName = user.Firstname,
                        LastName = user.Lastname,
                        Link = completeLink,
                        To = user.Email,
                        Type = StaticEnums.PASSWORD_RESET
                    };
                    return _mailService.Send(builder.CreateMailConfirmEmail(model));
                }
                return false;
            }
            else
            {
                MailBuilder builder = new MailBuilder(_configuration);
                return _mailService.Send(builder.CreateUserDoesNotExistMail(email));
            }
        }

        public bool SendForgottenUsernameMail(string email)
        {
            if (_userRepository.CheckIfEmailExists(email))
            {
                var user = _userRepository.TryGetUserByEmail(email);
                MailBuilder builder = new MailBuilder(_configuration);
                MailConfirmEmail model = new MailConfirmEmail
                {
                    FirstName = user.Firstname,
                    LastName = user.Lastname,
                    To = user.Email,
                    Type = StaticEnums.FORGOT_USERNAME,
                    Username = user.Username
                };
                return _mailService.Send(builder.CreateMailConfirmEmail(model));
            }
            else
            {
                MailBuilder builder = new MailBuilder(_configuration);
                return _mailService.Send(builder.CreateUserDoesNotExistMail(email));
            }
        }

        public bool ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            if (resetPasswordDto == null)
            {
                return false;
            }

            var isValidPw = PropertyValidation.IsValidPassword(resetPasswordDto.NewPassword);
            if (!isValidPw)
            {
                return false;
            }

            var res = _userRepository.TryUseConfirmationLink(resetPasswordDto.Token, ConfirmType.EmailConfirmation);
            if (res.Success != ConfirmKeyUsageSuccess.SUCESS)
            {
                return false;
            }
            return _userRepository.UpdatePassword(resetPasswordDto.Token, PasswordHasher.Hash(resetPasswordDto.NewPassword));
        }

        public TokenDto RenewToken(string oldToken)
        {
            var tokenPayloadStr = oldToken.Split('.')[1];
            var tokenPayloadStrBytes = Base64Url.Decode(tokenPayloadStr);
            var tokenPayloadStrDecoded = Encoding.UTF8.GetString(tokenPayloadStrBytes);
            var tokenPayload = JsonConvert.DeserializeObject<UserAuthenticationPayload>(tokenPayloadStrDecoded);
            return
                new TokenDto
                {
                    Token = CreateToken(tokenPayload.UserID)
                };
        }

        public bool HasMailConfirmed(string userId)
        {
            return _userRepository.UserHasConfirmedEmail(userId);
        }
    }
}
