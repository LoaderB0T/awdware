using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System.Text.Json;
using WebApi.Dtos.Led;
using WebApi.Helper;
using WebApi.Hubs;
using WebApi.Mapper;
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
        private readonly IHubContext<LedConfigHub> _ledConfigHub;

        public LedController(ILedService ledService, IAuthenticationService authenticationService, IHubContext<LedConfigHub> ledConfigHub)
        {
            _ledService = ledService;
            _authenticationService = authenticationService;
            _ledConfigHub = ledConfigHub;
        }

        [HttpGet]
        [Route("effects")]
        public ActionResult<LedConfigurationDto> GetMyLedEffects([FromHeader] string authorization)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            return Ok(_ledService.GetEffects(userId).Select(x => x.ToDto()));
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

        [HttpGet]
        [Route("selecteffect/{id}")]
        public ActionResult SelectEffect([FromHeader] string authorization, string id)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var effect = _ledService.GetEffect(userId, id);

            var hubConId = LedConfigHub._scope.GetConnectionId(userId);
            if (hubConId != null)
            {
                _ledConfigHub.Clients.Client(hubConId).SendAsync("ReceiveEffect", effect.ToDto()).ConfigureAwait(false);
            }
            return Ok();
        }

        [HttpGet]
        [Route("ledConfigFile")]
        public ActionResult<string> GetLedConfigFile([FromHeader] string authorization)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var hostInfo = HttpContext.Request.Host;
            var useHttps = HttpContext.Request.Scheme == "https";
            var host = hostInfo.Host;
            var port = hostInfo.Port;
            if (!port.HasValue)
            {
                return null;
            }
            var response = new LedConfigFileDto
            {
                ServerHost = host,
                ServerPort = port.Value,
                ServerUseHttps = useHttps,
                UserId = userId
            };
            var jsonString = JsonSerializer.Serialize(response);
            var encodedString = StringUtils.Encode(jsonString);
            var moreEncodedString = StringUtils.Caesar(encodedString, 42);
            return Ok(moreEncodedString);
        }
    }
}
