using Awdware.Business.Implementation.Services;
using Awdware.Facade.Dtos;
using Awdware.Infrastructure.Helper;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("refreshToken")]
        public ActionResult<TokenDto> GetNewToken([FromHeader] string authorization)
        {
            if (string.IsNullOrWhiteSpace(authorization))
                throw new ArgumentNullException(nameof(authorization));

            var oldToken = authorization.Replace("Baerer ", "", StringComparison.OrdinalIgnoreCase);
            var newTokenDto = _authenticationService.RenewToken(oldToken);
            return Ok(newTokenDto);
        }
    }
}