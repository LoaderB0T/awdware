using WebApi.Repositories;
using WebApi.Mapper;
using System.Collections.Generic;
using System.Linq;
using WebApi.Dtos.Led;
using System;
using WebApi.Entities;

namespace WebApi.Services
{
    public class LedService : ILedService
    {
        private readonly ILedRepository _ledRepository;
        private readonly IJwtService _jwtService;

        public LedService(
            ILedRepository ledRepository,
            IJwtService jwtService)
        {
            _ledRepository = ledRepository;
            _jwtService = jwtService;
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
    }
}
