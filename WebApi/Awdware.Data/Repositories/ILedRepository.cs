using Awdware.Facade.Dtos.Led;
using System;
using System.Collections.Generic;
using Awdware.Data.Facade.Entities;

namespace Awdware.Data.Implementation.Repositories
{
    public interface ILedRepository
    {
        IEnumerable<LedEffect> GetLedEffects(string userId);
        void UpdateLedConfig(Guid id, LedEffectDto ledEffect, string newName);
        void AddLedConfig(Guid id, string userId, LedEffectDto ledEffect, string newName, int ordinal);
        LedEffect GetLedConfig(string userId, Guid id);
        bool DeleteLedConfig(string userId, Guid id);
        LedSetting GetSetting(Guid id);
        bool ChangeSetting(LedSettingsDto config, string userId);
        LedSetting AddSetting(string userId);
        IEnumerable<LedSetting> GetAllSettings(string userId);
        bool DeleteSetting(string userId, Guid settingId);
    }
}
