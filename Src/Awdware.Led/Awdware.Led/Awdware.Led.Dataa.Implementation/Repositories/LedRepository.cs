using Awdware.Led.Facade.Dtos;
using System.Linq;
using System.Collections.Generic;
using System;
using System.Text.Json;
using Awdware.Led.Data.Facade.Entities;
using Awdware.Led.Data.Implementation.Contexts;

namespace Awdware.Led.Data.Implementation.Repositories
{
    public class LedRepository : ILedRepository
    {
        private readonly LedDbContext _dbContext;

        public LedRepository(LedDbContext ledDbContext)
        {
            _dbContext = ledDbContext;
        }

        public IEnumerable<LedEffect> GetLedEffects(string userId)
        {
            return _dbContext.LedConfigs.Where(x => x.UserId == userId);
        }

        public void UpdateLedConfig(Guid id, LedEffectDto ledEffect, string newName)
        {
            var oldConfig = _dbContext.LedConfigs.First(x => x.Id == id);
            oldConfig.Name = newName;
            oldConfig.ConfigJson = JsonSerializer.Serialize(ledEffect);
            _dbContext.SaveChanges();
        }
        public void AddLedConfig(Guid id, string userId, LedEffectDto ledEffect, string newName, int ordinal)
        {
            var ledConfig = new LedEffect
            {
                Id = id,
                UserId = userId,
                Name = newName,
                Version = 1,
                Ordinal = ordinal,
                ConfigJson = JsonSerializer.Serialize(ledEffect)
            };
            _dbContext.LedConfigs.Add(ledConfig);
            _dbContext.SaveChanges();
        }

        public LedEffect GetLedConfig(string userId, Guid id)
        {
            var effect = _dbContext.LedConfigs.FirstOrDefault(x => x.Id.Equals(id) && x.UserId.Equals(userId));
            return effect;
        }

        public bool DeleteLedConfig(string userId, Guid id)
        {
            var effect = _dbContext.LedConfigs.FirstOrDefault(x => x.Id.Equals(id) && x.UserId.Equals(userId));
            if (effect == null)
            {
                return false;
            }
            _dbContext.LedConfigs.Remove(effect);
            _dbContext.SaveChanges();
            return true;
        }

        public LedSetting GetSetting(Guid id)
        {
            var setting = _dbContext.LedSettings.FirstOrDefault(x => x.Id.Equals(id));
            return setting;
        }

        public bool ChangeSetting(LedSettingsDto config, string userId)
        {
            if (config == null || string.IsNullOrEmpty(userId))
                return false;
            var setting = _dbContext.LedSettings.FirstOrDefault(x => Guid.Parse(config.Id).Equals(x.Id));

            var settingUserId = setting.UserId;
            var dtoUserId = config.UserId;
            var authUserId = userId;

            if (!settingUserId.Equals(dtoUserId, StringComparison.InvariantCultureIgnoreCase) || !settingUserId.Equals(authUserId, StringComparison.InvariantCultureIgnoreCase))
            {
                return false;
            }
            setting.ComPortName = config.ComPortName;
            setting.SettingName = config.SettingName;
            _dbContext.SaveChanges();
            return true;
        }

        public LedSetting AddSetting(string userId)
        {
            var newSetting = new LedSetting
            {
                ComPortName = "COM1",
                SettingName = "Setting1",
                Id = Guid.NewGuid(),
                UserId = userId
            };

            _dbContext.LedSettings.Add(newSetting);
            _dbContext.SaveChanges();

            return newSetting;
        }

        public IEnumerable<LedSetting> GetAllSettings(string userId)
        {
            var settings = _dbContext.LedSettings.Where(x => x.UserId.ToUpper().Equals(userId.ToUpper()));
            return settings;
        }

        public bool DeleteSetting(string userId, Guid settingId)
        {
            var setting = _dbContext.LedSettings.FirstOrDefault(x => x.UserId.ToUpper().Equals(userId.ToUpper()) && x.Id.Equals(settingId));
            if (setting == null)
                return false;
            _dbContext.LedSettings.Remove(setting);
            _dbContext.SaveChanges();
            return true;
        }
    }
}
