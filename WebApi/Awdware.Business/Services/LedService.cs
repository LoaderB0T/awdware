using System.Collections.Generic;
using System.Linq;
using System;
using Awdware.Data.Facade.Entities;
using Awdware.Facade.Dtos.Led;
using Awdware.Data.Implementation.Repositories;

namespace Awdware.Business.Implementation.Services
{
    public class LedService : ILedService
    {
        private readonly ILedRepository _ledRepository;

        public LedService(
            ILedRepository ledRepository
            )
        {
            _ledRepository = ledRepository;
        }

        public IEnumerable<LedEffect> GetEffects(string userId)
        {
            return _ledRepository.GetLedEffects(userId);
        }

        public LedEffect GetEffect(string userId, string id)
        {
            return _ledRepository.GetLedEffects(userId).FirstOrDefault(x => x.Id.ToString().Equals(id));
        }

        public bool UpdateEffect(string userId, LedConfigurationDto newConfig)
        {
            var id = Guid.Parse(newConfig.Id);
            var oldEffects = _ledRepository.GetLedEffects(userId);
            if (!oldEffects.Any(x => x.Id.Equals(id)))
            {
                return false;
            }
            _ledRepository.UpdateLedConfig(id, newConfig.LedEffect, newConfig.Name);
            return true;
        }

        public Guid AddEffect(string userId, LedConfigurationDto newConfig)
        {
            var newId = Guid.NewGuid();
            var existingOrdinals = _ledRepository.GetLedEffects(userId).Select(x => x.Ordinal);
            var newOrdinal = existingOrdinals.Any() ? existingOrdinals.Max() + 1 : 1;
            _ledRepository.AddLedConfig(newId, userId, newConfig.LedEffect, newConfig.Name, newOrdinal);
            return newId;
        }

        public bool DeleteEffect(string userId, string id)
        {
            var guid = Guid.Parse(id);
            var success = _ledRepository.DeleteLedConfig(userId, guid);
            return success;
        }

        public LedSetting GetSetting(Guid id)
        {
            var setting = _ledRepository.GetSetting(id);
            return setting;
        }

        public bool ChangeSetting(LedSettingsDto config, string userId)
        {
            var success = _ledRepository.ChangeSetting(config, userId);
            return success;
        }

        public LedSetting AddSetting(string userId)
        {
            var result = _ledRepository.AddSetting(userId);
            return result;
        }

        public IEnumerable<LedSetting> GetAllSettings(string userId)
        {
            var result = _ledRepository.GetAllSettings(userId);
            return result;
        }

        public bool DeleteSetting(string userId, Guid settingId)
        {
            var success = _ledRepository.DeleteSetting(userId, settingId);
            return success;
        }
    }
}
