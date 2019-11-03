using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        [Route("effects")]
        public ActionResult<LedConfigurationDto> GetMyLedeffects([FromHeader] string authorization)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            return Ok(_ledService.GetConfigurations(userId));
        }

        [HttpPost]
        [Route("updateeffect")]
        public ActionResult UpdateLedEffect([FromHeader] string authorization, [FromBody] LedConfigurationDto newConfig)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            _ledService.UpdateEffect(userId, newConfig);
            return Ok();
        }

        [HttpPost]
        [Route("addeffect")]
        public ActionResult<string> AddLedEffect([FromHeader] string authorization, [FromBody] LedConfigurationDto newConfig)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var newId = _ledService.AddEffect(userId, newConfig);
            return Ok(newId.ToString());
        }

        [HttpDelete]
        [Route("effect/{id}")]
        public ActionResult<bool> DeleteLedEffect([FromHeader] string authorization, string id)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var success = _ledService.DeleteEffect(userId, id);
            return Ok(success);
        }
    }
}
