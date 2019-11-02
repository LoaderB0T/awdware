using System.Collections.Generic;
using WebApi.Dtos.Led;

namespace WebApi.Services
{
    public interface ILedService
    {
        IEnumerable<LedConfigurationDto> GetConfigurations(string userId);
        bool UpdateConfiguration(string userId, LedConfigurationDto newConfig);
    }
}
