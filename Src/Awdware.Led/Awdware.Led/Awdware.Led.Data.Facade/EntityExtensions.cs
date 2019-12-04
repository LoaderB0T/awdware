using Awdware.Led.Data.Facade.Entities;
using Awdware.Led.Facade.Dtos;
using System.Text.Json;

namespace Awdware.Led.Data.Facade
{
    public static class EntityExtensions
    {
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
