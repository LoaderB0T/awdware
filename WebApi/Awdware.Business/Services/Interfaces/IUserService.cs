using Awdware.Facade.Dtos;

namespace Awdware.Business.Implementation.Services
{
    public interface IUserService
    {
        UserInfoDto GetMyUserInfo(string userId);
        RegisterResult RegisterRequestValid(RegisterRequestDto registerRequestDto);
    }
}
