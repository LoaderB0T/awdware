using System.Collections.Generic;
using WebApi.Dtos;

namespace WebApi.Services
{
    public interface ILedService
    {
        IEnumerable<LedConfigurationDto> GetConfigurations(string userId);
    }
}
