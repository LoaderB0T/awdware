using System;
using System.Collections.Generic;
using WebApi.Dtos.Led;
using WebApi.Entities;

namespace WebApi.Repositories
{
    public interface ILedRepository
    {
        IEnumerable<LedEffect> GetLedEffects(string userId);
        void UpdateLedConfig(Guid id, LedEffectDto ledEffect, string newName);
        void AddLedConfig(Guid id, string userId, LedEffectDto ledEffect, string newName, int ordinal);
        LedEffect GetLedConfig(string userId, Guid id);
        bool DeleteLedConfig(string userId, Guid id);
    }
}
