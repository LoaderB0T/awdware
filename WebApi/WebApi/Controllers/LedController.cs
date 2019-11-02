using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Dtos.Led;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("RegisteredUser")]
    public class LedController : ControllerBase
    {
        private readonly ILedService _ledService;
        private readonly IAuthenticationService _authenticationService;

        public LedController(ILedService ledService, IAuthenticationService authenticationService)
        {
            _ledService = ledService;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [Route("configs")]
        public ActionResult<UserInfoDto> GetMyLedConfigurations([FromHeader] string authorization)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            return Ok(_ledService.GetConfigurations(userId));
        }

        [HttpPost]
        [Route("config")]
        public ActionResult<UserInfoDto> UpdateLedConfiguration([FromHeader] string authorization, [FromBody] LedConfigurationDto newConfig)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            _ledService.UpdateConfiguration(userId, newConfig);
            return Ok();
        }
    }
}
