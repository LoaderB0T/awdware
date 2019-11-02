using WebApi.Dtos;
using WebApi.Entities;

namespace WebApi.Mapper
{
    public static class EntityToDtoMapper
    {
        public static LoginResponseDto ToLoginResponseDto(this WebUser user)
        {
            return new LoginResponseDto()
            {
                UserInfo = user.ToUserInfoDto(),
                LoginSuccess = LoginResult.SUCCESS
            };
        }

        public static UserInfoDto ToUserInfoDto(this WebUser user)
        {
            return new UserInfoDto()
            {
                UserId = user.UserId,
                Username = user.Username,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email
            };
        }

        public static RegisterResponseDto ToRegisterResponseDto(this WebUser user)
        {
            return new RegisterResponseDto()
            {
                RegisterSuccess = RegisterResult.SUCCESS,
                UserInfo = user.ToUserInfoDto()
            };
        }

        public static LedConfigurationDto ToDto(this LedConfig ledConfig)
        {
            return new LedConfigurationDto()
            {
                Name = ledConfig.Name,
                ConfigJson = ledConfig.ConfigJson
            };
        }
    }
}
