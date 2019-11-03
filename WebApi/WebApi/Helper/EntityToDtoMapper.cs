using System.Text.Json;
using WebApi.Dtos;
using WebApi.Dtos.Led;
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

        public static LedConfigurationDto ToDto(this LedEffect ledConfig)
        {
            return new LedConfigurationDto()
            {
                Id = ledConfig.Id.ToString(),
                Name = ledConfig.Name,
                Ordinal = ledConfig.Ordinal,
                UserId = ledConfig.UserId,
                LedEffect = JsonSerializer.Deserialize<LedEffectDto>(ledConfig.ConfigJson)
            };
        }
    }
}
