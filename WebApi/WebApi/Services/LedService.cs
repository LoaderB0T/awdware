using WebApi.Dtos;
using WebApi.Repositories;
using WebApi.Mapper;
using WebApi.Static;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.Services
{
    public class LedService : ILedService
    {
        private readonly ILedRepository _ledRepository;
        private readonly IJwtService _jwtService;

        public LedService(
            ILedRepository ledRepository,
            IJwtService jwtService)
        {
            _ledRepository = ledRepository;
            _jwtService = jwtService;
        }

        public IEnumerable<LedConfigurationDto> GetConfigurations(string userId)
        {
            return _ledRepository.GetLedConfig(userId).Select(x => x.ToDto());
        }
    }
}
