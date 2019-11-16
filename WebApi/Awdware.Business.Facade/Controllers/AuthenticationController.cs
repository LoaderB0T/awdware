using Awdware.Business.Implementation.Services;
using Awdware.Facade.Dtos;
using Awdware.Infrastructure.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Awdware.Business.Facade.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("RegisteredUser")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserService _userService;

        public AuthenticationController(
            IAuthenticationService authenticationService,
            IUserService userService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        [ProducesResponseType(200, Type = typeof(RegisterResponseDto))]
        public ActionResult<RegisterResponseDto> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            if (registerRequestDto == null)
            {
                Logger.LogError(new ArgumentNullException(nameof(registerRequestDto)), "");
                throw new ArgumentNullException(nameof(registerRequestDto));
            }

            var requestValid = _userService.RegisterRequestValid(registerRequestDto);
            if (requestValid != RegisterResult.Success)
            {
                return Ok(new RegisterResponseDto { RegisterSuccess = requestValid });
            }

            var registerResponseDto = _authenticationService.CreateUser(registerRequestDto);

            var token = _authenticationService.CreateToken(registerResponseDto.UserInfo.UserId);
            registerResponseDto.Token = token;

            var refreshToken = _authenticationService.CreateRefreshToken(registerResponseDto.UserInfo.UserId);
            SetCookie("refresh_token", refreshToken, 60 * 24 * 180); // Lasts 180 days

            return Ok(registerResponseDto);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(200, Type = typeof(LoginResponseDto))]
        public ActionResult<LoginResponseDto> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            if (loginRequestDto == null)
                throw new ArgumentNullException(nameof(loginRequestDto));

            var loginResponse = _authenticationService.Login(loginRequestDto);

            if (loginResponse.LoginSuccess != LoginResult.Success)
            {
                return Ok(loginResponse);
            }

            var token = _authenticationService.CreateToken(loginResponse.UserInfo.UserId);
            loginResponse.Token = token;

            var refreshToken = _authenticationService.CreateRefreshToken(loginResponse.UserInfo.UserId);
            SetCookie("refresh_token", refreshToken, 60 * 24 * 180); // Lasts 180 days

            return Ok(loginResponse);
        }

        [AllowAnonymous]
        [HttpPost("loginhelp")]
        public IActionResult LoginHelp([FromBody] LoginHelpRequestDto loginHelpRequestDto)
        {
            if (loginHelpRequestDto == null)
                throw new ArgumentNullException(nameof(loginHelpRequestDto));
            if (loginHelpRequestDto.ForgotPassword)
            {
                if (_authenticationService.SendResetPasswordMail(loginHelpRequestDto.Email))
                    return Ok();
            }
            else if (loginHelpRequestDto.ForgotUsername)
            {
                if (_authenticationService.SendForgottenUsernameMail(loginHelpRequestDto.Email))
                    return Ok();
            }
            return StatusCode(500);
        }

        [AllowAnonymous]
        [HttpPost("resetpassword")]
        public ActionResult<PasswordResetStatus> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            if (resetPasswordDto == null)
                throw new ArgumentNullException(nameof(resetPasswordDto));
            if (_authenticationService.ResetPassword(resetPasswordDto))
                return Ok(PasswordResetStatus.Success);
            return Ok(PasswordResetStatus.Error);
        }

        [AllowAnonymous]
        [HttpGet("emailconfirmation/{link}")]
        public IActionResult ConfirmEmail(string link)
        {
            if (string.IsNullOrWhiteSpace(link))
                throw new ArgumentNullException(nameof(link));

            _authenticationService.ConfirmEmail(link);

            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("refreshToken")]
        public ActionResult<TokenDto> GetNewToken([FromHeader] string authorization)
        {
            if (string.IsNullOrWhiteSpace(authorization))
                throw new ArgumentNullException(nameof(authorization));

            var requestUserId = _authenticationService.GetUserIdFromToken(authorization);

            var savedRefreshToken = Request.Cookies["refresh_token"];
            if(string.IsNullOrEmpty(savedRefreshToken))
            {
                return Ok(null);
            }
            var refreshUserId = _authenticationService.GetUserIdFromToken(authorization);

            if (!requestUserId.Equals(refreshUserId, StringComparison.InvariantCultureIgnoreCase))
            {
                return Ok(null);
            }

            var renewedRefreshToken = _authenticationService.RenewRefreshToken(savedRefreshToken);

            var oldToken = authorization.Replace("Bearer ", "", StringComparison.InvariantCultureIgnoreCase);
            var newTokenDto = _authenticationService.RenewToken(oldToken, false);
            
            SetCookie("refresh_token", renewedRefreshToken, 60 * 24 * 180); // Lasts 180 days

            return Ok(newTokenDto);
        }

        private void SetCookie(string key, string value, int? expireInMinutes)
        {
            CookieOptions option = new CookieOptions();

            if (expireInMinutes.HasValue)
                option.Expires = DateTime.Now.AddMinutes(expireInMinutes.Value);
            else
                option.Expires = DateTime.Now.AddMilliseconds(10);

            option.IsEssential = true;

            Response.Cookies.Append(key, value, option);
        }
    }
}