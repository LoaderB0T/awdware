﻿using Awdware.Data.Facade.Entities;
using Awdware.Facade.Dtos;
using Awdware.Facade.Dtos.Led;
using System.Text.Json;

namespace Awdware.Data.Facade.Utils
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
                Email = user.Email
            };
        }

        public static UserInfoDto ToUserInfoDto(this WebUser user)
        {
            return new UserInfoDto()
            {
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

        public static LedSettingsDto ToDto(this LedSetting ledSetting)
        {
            return new LedSettingsDto()
            {
                Id = ledSetting.Id.ToString(),
                SettingName = ledSetting.SettingName,
                ComPortName = ledSetting.ComPortName,
                UserId = ledSetting.UserId
            };
        }
    }
}
