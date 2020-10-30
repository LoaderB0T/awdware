using Awdware.Core.Data.Facade.Entities;
using Awdware.Core.Facade.Dtos;

namespace Awdware.Core.Data.Facade.Utils
{
    public static class EntityToDtoMapper
    {
        public static LoginResponseDto ToLoginResponseDto(this WebUser user)
        {
            return new LoginResponseDto()
            {
                UserInfo = user.ToUserDetailsDto(),
                LoginSuccess = LoginResult.Success
            };
        }

        public static UserDetailsDto ToUserDetailsDto(this WebUser user)
        {
            return new UserDetailsDto()
            {
                UserId = user.UserId,
                Username = user.Username,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Permission = (UserPermission)user.Permission
            };
        }

        public static UserInfoDto ToUserInfoDto(this WebUser user)
        {
            return new UserInfoDto()
            {
                Id = user.UserId,
                Username = user.Username
            };
        }

        public static RegisterResponseDto ToRegisterResponseDto(this WebUser user)
        {
            return new RegisterResponseDto()
            {
                RegisterSuccess = RegisterResult.Success,
                UserInfo = user.ToUserDetailsDto()
            };
        }
    }
}
