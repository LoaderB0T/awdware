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
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _webShopDBContext;

        public LedRepository(ApplicationDbContext webShopDBContext, ILogger logger)
        {
            _webShopDBContext = webShopDBContext;
            _logger = logger;
        }

        public IEnumerable<LedEffect> GetLedConfigs(string userId)
        {
            return _webShopDBContext.LedConfigs.Where(x => x.UserId == userId);
        }

        public void UpdateLedConfig(Guid id, LedEffectDto ledEffect, string newName)
        {
            var oldConfig = _webShopDBContext.LedConfigs.First(x => x.Id == id);
            oldConfig.Name = newName;
            oldConfig.ConfigJson = JsonSerializer.Serialize(ledEffect);
            _webShopDBContext.SaveChanges();
        }
        public void AddLedConfig(Guid id, string userId, LedEffectDto ledEffect, string newName)
        {
            var ledConfig = new LedEffect();
            ledConfig.Id = id;
            ledConfig.UserId = userId;
            ledConfig.Name = newName;
            ledConfig.Version = 1;
            ledConfig.ConfigJson = JsonSerializer.Serialize(ledEffect);
            _webShopDBContext.LedConfigs.Add(ledConfig);
            _webShopDBContext.SaveChanges();
        }
    }
}
