using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Entities;

namespace WebApi.Services
{
    public interface IAuthenticationService
    {
        string CreateToken(string userId);
        LoginResponseDto Login(LoginRequestDto loginRequestDto);
        RegisterResponseDto CreateUser(RegisterRequestDto registerRequestDto);
        string GenerateRandomLink();
        bool SendEmailConfirmationLink(WebUser user);
        bool ConfirmEmail(string link);
        bool SendResetPasswordMail(string email);
        bool ResetPassword(ResetPasswordDto resetPasswordDto);
        TokenDto RenewToken(string oldToken);
        string GetUserIdFromToken(string token);
        bool SendForgottenUsernameMail(string email);
        bool HasMailConfirmed(string userId);
    }
}
