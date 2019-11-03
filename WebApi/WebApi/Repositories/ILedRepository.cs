using System;
using System.Collections.Generic;
using WebApi.Dtos.Led;
using WebApi.Entities;

namespace WebApi.Repositories
{
    public interface ILedRepository
    {
        IEnumerable<LedEffect> GetLedConfigs(string userId);
        void UpdateLedConfig(Guid id, LedEffectDto ledEffect, string newName);
        void AddLedConfig(Guid id, string userId, LedEffectDto ledEffect, string newName);
    }
}
