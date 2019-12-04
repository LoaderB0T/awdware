using Awdware.Core.Facade.Dtos;

namespace Awdware.Core.Business.Implementation.Services
{
    public interface IUserService
    {
        UserDetailsDto GetMyUserDetails(string userId);
        RegisterResult RegisterRequestValid(RegisterRequestDto registerRequestDto);
        UserInfoDto GetUserInfo(string userId);
    }
}
