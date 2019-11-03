using WebApi.Repositories;
using WebApi.Mapper;
using System.Collections.Generic;
using System.Linq;
using WebApi.Dtos.Led;
using System;

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

        public IEnumerable<LedConfigurationDto> GetConfigurations(string userId)
        {
            return _ledRepository.GetLedConfigs(userId).Select(x => x.ToDto());
        }

        public bool UpdateEffect(string userId, LedConfigurationDto newConfig)
        {
            var id = Guid.Parse(newConfig.Id);
            var oldConfigs = _ledRepository.GetLedConfigs(userId);
            if (!oldConfigs.Any(x => x.Id.Equals(id)))
            {
                return false;
            }
            _ledRepository.UpdateLedConfig(id, newConfig.LedEffect, newConfig.Name);
            return true;
        }

        public Guid AddEffect(string userId, LedConfigurationDto newConfig)
        {
            var newId = Guid.NewGuid();
            _ledRepository.AddLedConfig(newId, userId, newConfig.LedEffect, newConfig.Name);
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
