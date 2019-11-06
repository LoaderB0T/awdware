using System;
using System.Collections.Generic;
using WebApi.Dtos.Led;
using WebApi.Entities;

namespace WebApi.Services
{
    public interface ILedService
    {
        IEnumerable<LedEffect> GetEffects(string userId);
        LedEffect GetEffect(string userId, string id);
        bool UpdateEffect(string userId, LedConfigurationDto newConfig);
        Guid AddEffect(string userId, LedConfigurationDto newConfig);
        bool DeleteEffect(string userId, string id);
        LedSetting GetSetting(Guid id);
    }
}
