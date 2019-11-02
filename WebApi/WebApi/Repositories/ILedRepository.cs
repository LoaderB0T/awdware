using System;
using System.Collections.Generic;
using WebApi.Dtos.Led;
using WebApi.Entities;

namespace WebApi.Repositories
{
    public interface ILedRepository
    {
        IEnumerable<LedConfig> GetLedConfigs(string userId);
        void UpdateLedConfig(Guid id, LedEffectDto ledEffect, string newName);
    }
}
