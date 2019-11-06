using Microsoft.Extensions.Logging;
using System.Linq;
using WebApi.Contexts;
using WebApi.Entities;
using System.Collections.Generic;
using WebApi.Dtos.Led;
using System;
using System.Text.Json;

namespace WebApi.Repositories
{
    public class LedRepository : ILedRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public LedRepository(ApplicationDbContext webShopDBContext)
        {
            _dbContext = webShopDBContext;
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
            var ledConfig = new LedEffect();
            ledConfig.Id = id;
            ledConfig.UserId = userId;
            ledConfig.Name = newName;
            ledConfig.Version = 1;
            ledConfig.Ordinal = ordinal;
            ledConfig.ConfigJson = JsonSerializer.Serialize(ledEffect);
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
            if(effect == null)
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
    }
}
