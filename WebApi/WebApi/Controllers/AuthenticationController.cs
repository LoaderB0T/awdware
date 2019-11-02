using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using WebApi.Dtos;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("RegisteredUser")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IUserService _userService;
        private readonly ILogger _logger;

        public AuthenticationController(
            IAuthenticationService authenticationService,
            IUserService userService,
            ILogger logger)
        {
            _authenticationService = authenticationService;
            _userService = userService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        [ProducesResponseType(200, Type = typeof(RegisterResponseDto))]
        public ActionResult<RegisterResponseDto> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            if (registerRequestDto == null)
            {
                _logger.LogError(new ArgumentNullException(nameof(registerRequestDto)), "");
                throw new ArgumentNullException(nameof(registerRequestDto));
            }

            var requestValid = _userService.RegisterRequestValid(registerRequestDto);
            if (requestValid != RegisterResult.SUCCESS)
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

            if (loginResponse.LoginSuccess != LoginResult.SUCCESS)
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
                return Ok(PasswordResetStatus.SUCCESS);
            return Ok(PasswordResetStatus.NO_SUCCESS);
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

            var oldToken = authorization.Replace("Baerer ", "");
            var newTokenDto = _authenticationService.RenewToken(oldToken);
            return Ok(newTokenDto);
        }
    }
}