using System;
using Microsoft.Extensions.Configuration;
using System.Text;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Globalization;
using Awdware.Core.Facade.Dtos;
using Awdware.Core.Data.Facade.Entities;
using Awdware.Core.Data.Facade.Utils;
using Awdware.Core.Data.Implementation.Repositories;
using Awdware.Core.Infrastructure.Helper;
using Awdware.Core.Infrastructure.Mails;
using Awdware.Core.Business.Models.JwtPayloads;
using Awdware.Core.Business.Utils.Models;
using Awdware.Core.Business.Utils;

namespace Awdware.Core.Business.Implementation.Services
{

    public class AuthenticationService : IAuthenticationService
    {

        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly IMailService _mailService;

        private readonly string _clientUrl;

        public AuthenticationService(
            IUserRepository userRepository,
            IJwtService jwtService,
            IConfiguration configuration,
            IMailService mailService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _configuration = configuration;
            _mailService = mailService;
            _clientUrl = _configuration.GetSection("Clients").GetValue<string>("WebClient");
        }

        public string CreateToken(string userId)
        {
            var token = _jwtService.CreateToken(userId);
            return token;
        }

        public LoginResponseDto Login(LoginRequestDto loginRequestDto)
        {
            if (loginRequestDto == null)
                return null;
            var potentialUser = _userRepository.TryGetUserByName(loginRequestDto.Username);
            if (potentialUser == null)
            {
                return new LoginResponseDto
                {
                    LoginSuccess = LoginResult.WrongUsername
                };
            }

            var passwordMatch = _userRepository.ValidatePassword(potentialUser, loginRequestDto.Password);

            if (passwordMatch)
            {
                return potentialUser.ToLoginResponseDto();
            }
            else
            {
                return new LoginResponseDto
                {
                    LoginSuccess = LoginResult.WrongPassword
                };
            }
        }

        public RegisterResponseDto CreateUser(RegisterRequestDto registerRequestDto)
        {
            if (registerRequestDto == null)
                return null;
            var newUser = new WebUser
            {
                UserId = "user:" + string.Format(CultureInfo.InvariantCulture, "{0:yyyyMMddHHmmssffff}", DateTime.UtcNow),
                Email = registerRequestDto.Email,
                Firstname = registerRequestDto.Firstname,
                Lastname = registerRequestDto.Lastname,
                Username = registerRequestDto.Username,
                Permission = WebUserPermission.User
            };
            var newPw = PasswordHasher.Hash(registerRequestDto.Password);
            newUser.PasswordHash = newPw;

            if (_userRepository.AddUser(newUser))
            {
                SendEmailConfirmationLink(newUser);
                return newUser.ToRegisterResponseDto();
            }

            return new RegisterResponseDto { RegisterSuccess = RegisterResult.Unknown };
        }

        public string GenerateRandomLink()
        {
            byte[] b = new byte[32];
            var rndm = RandomNumberGenerator.Create();
            rndm.GetNonZeroBytes(b);
            rndm.Dispose();
            string randomPart = Convert.ToBase64String(b);
            randomPart = randomPart.Replace('/', 'm').Replace('+', 'x');
            string time = Convert.ToBase64String(Encoding.UTF8.GetBytes(string.Format(CultureInfo.InvariantCulture, "{0:yyyyMMddHHmmssffff}", DateTime.UtcNow)));
            time = time.Replace('/', 'm').Replace('+', 'x');
            return randomPart + time;
        }

        public bool SendEmailConfirmationLink(WebUser user)
        {
            if (user == null)
                return false;

            string link = GenerateRandomLink();
            if (_userRepository.AddConfirmationKey(user, link, ConfirmType.EmailConfirmation))
            {
                string completeLink = _clientUrl + "/account/verify/" + link;
                using MailBuilder builder = new MailBuilder(_configuration);
                MailConfirmEmail model = new MailConfirmEmail
                {
                    FirstName = user.Firstname,
                    LastName = user.Lastname,
                    Link = completeLink,
                    To = user.Email,
                    Type = EmailKind.EmailConfirmation
                };
                var msg = builder.CreateMailConfirmEmail(model);
                builder.Dispose();
                return _mailService.Send(msg);
            }
            Logger.LogInformation("Could not save confirmation link {link} for user {user}", link, user);
            return false;
        }

        public bool ConfirmEmail(string link)
        {
            var res = _userRepository.TryUseConfirmationLink(link, ConfirmType.EmailConfirmation);
            if (res.Success != ConfirmKeyUsageSuccess.Success)
            {
                return false;
            }

            _userRepository.SetMailConfirmed(res.WebUser.UserId);

            return true;
        }

        public string GetUserIdFromToken(string token)
        {
            if (string.IsNullOrEmpty(token))
                return null;
            token = token.Replace("Bearer ", "", StringComparison.InvariantCultureIgnoreCase);
            var tokenPayloadStr = token.Split('.')[1];
            var tokenPayloadStrDecoded = StringUtils.Decode(tokenPayloadStr);
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
                    using MailBuilder builder = new MailBuilder(_configuration);
                    MailConfirmEmail model = new MailConfirmEmail
                    {
                        FirstName = user.Firstname,
                        LastName = user.Lastname,
                        Link = completeLink,
                        To = user.Email,
                        Type = EmailKind.PasswordReset
                    };
                    var msg = builder.CreateMailConfirmEmail(model);
                    return _mailService.Send(msg);
                }
                return false;
            }
            else
            {
                using MailBuilder builder = new MailBuilder(_configuration);
                return _mailService.Send(builder.CreateUserDoesNotExistMail(email));
            }
        }

        public bool SendForgottenUsernameMail(string email)
        {
            if (_userRepository.CheckIfEmailExists(email))
            {
                var user = _userRepository.TryGetUserByEmail(email);
                using MailBuilder builder = new MailBuilder(_configuration);
                MailConfirmEmail model = new MailConfirmEmail
                {
                    FirstName = user.Firstname,
                    LastName = user.Lastname,
                    To = user.Email,
                    Type = EmailKind.ForgotUsername,
                    Username = user.Username
                };
                return _mailService.Send(builder.CreateMailConfirmEmail(model));
            }
            else
            {
                using MailBuilder builder = new MailBuilder(_configuration);
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
            if (res.Success != ConfirmKeyUsageSuccess.Success)
            {
                return false;
            }
            return _userRepository.UpdatePassword(resetPasswordDto.Token, PasswordHasher.Hash(resetPasswordDto.NewPassword));
        }

        public TokenDto RenewToken(string oldToken, bool validateLifeTime)
        {
            if (string.IsNullOrEmpty(oldToken))
                return null;

            if (!_jwtService.IsValidAccessToken(oldToken, validateLifeTime))
            {
                return null;
            }

            var userId = GetUserIdFromToken(oldToken);

            return new TokenDto
            {
                Token = CreateToken(userId)
            };
        }

        public bool HasMailConfirmed(string userId)
        {
            return _userRepository.UserHasConfirmedEmail(userId);
        }

        public string CreateRefreshToken(string userId)
        {
            var token = _jwtService.CreateRefreshToken(userId);
            return token;
        }

        public string RenewRefreshToken(string oldRefreshToken)
        {
            if (string.IsNullOrEmpty(oldRefreshToken))
                return null;

            if (!_jwtService.IsValidRefreshToken(oldRefreshToken))
            {
                return null;
            }

            var userId = GetUserIdFromToken(oldRefreshToken);

            return CreateRefreshToken(userId);
        }
    }
}
