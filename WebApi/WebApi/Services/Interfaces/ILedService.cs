using System;
using System.Collections.Generic;
using WebApi.Dtos.Led;

namespace WebApi.Services
{
    public interface ILedService
    {
        IEnumerable<LedConfigurationDto> GetConfigurations(string userId);
        bool UpdateEffect(string userId, LedConfigurationDto newConfig);
        Guid AddEffect(string userId, LedConfigurationDto newConfig);
        bool DeleteEffect(string userId, string id);
    }
}
