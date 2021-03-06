﻿using Awdware.Led.Data.Facade.Entities;
using Awdware.Led.Facade.Dtos;
using System;
using System.Collections.Generic;

namespace Awdware.Led.Business.Implementation.Services
{
    public interface ILedService
    {
        IEnumerable<LedEffect> GetEffects(string userId);
        LedEffect GetEffect(string userId, string id);
        bool UpdateEffect(string userId, LedConfigurationDto newConfig);
        Guid? AddEffect(string userId, LedConfigurationDto newConfig);
        bool DeleteEffect(string userId, string id);
        LedSetting GetSetting(Guid id);
        bool ChangeSetting(LedSettingsDto config, string userID);
        LedSetting AddSetting(string userId);
        IEnumerable<LedSetting> GetAllSettings(string userId);
        bool DeleteSetting(string userId, Guid settingId);
    }
}
