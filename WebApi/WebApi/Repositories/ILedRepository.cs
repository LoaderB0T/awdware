using System.Collections.Generic;
using WebApi.Entities;

namespace WebApi.Repositories
{
    public interface ILedRepository
    {
        IEnumerable<LedConfig> GetLedConfig(string userId);
    }
}
