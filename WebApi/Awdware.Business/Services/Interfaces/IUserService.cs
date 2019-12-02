using Awdware.Facade.Dtos;

namespace Awdware.Business.Implementation.Services
{
    public interface IUserService
    {
        UserDetailsDto GetMyUserDetails(string userId);
        RegisterResult RegisterRequestValid(RegisterRequestDto registerRequestDto);
        UserInfoDto GetUserInfo(string userId);
    }
}
