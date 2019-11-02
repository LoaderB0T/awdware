using Microsoft.Extensions.Logging;
using System.Linq;
using WebApi.Contexts;
using WebApi.Entities;
using System.Collections.Generic;

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

        public IEnumerable<LedConfig> GetLedConfig(string userId)
        {
            return _webShopDBContext.LedConfigs.Where(x => x.UserId == userId);
        }
    }
}
