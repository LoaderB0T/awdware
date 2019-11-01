using WebApi.Dtos;

namespace WebApi.Services
{
    public interface IUserService
    {
        UserInfoDto GetMyUserInfo(string userId);
        RegisterResult RegisterRequestValid(RegisterRequestDto registerRequestDto);
    }
}
