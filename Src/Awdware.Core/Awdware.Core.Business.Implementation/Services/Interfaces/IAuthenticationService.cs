using Awdware.Core.Data.Facade.Entities;
using Awdware.Core.Facade.Dtos;

namespace Awdware.Core.Business.Implementation.Services
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
        TokenDto RenewToken(string oldToken, bool validateLifeTime);
        string GetUserIdFromToken(string token);
        bool SendForgottenUsernameMail(string email);
        bool HasMailConfirmed(string userId);
        string CreateRefreshToken(string userId);
        string RenewRefreshToken(string oldRefreshToken);
    }
}
