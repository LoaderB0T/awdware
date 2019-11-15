using Awdware.Business.Implementation.Services;
using Awdware.Business.Facade.Hubs;
using Awdware.Facade.Dtos.Led;
using Awdware.Data.Facade.Utils;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;
using System.Linq;
using System;
using Awdware.Infrastructure.Helper;

namespace Awdware.Business.Facade.Controllers
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

        [HttpPut]
        [Route("effect")]
        public ActionResult UpdateLedEffect([FromHeader] string authorization, [FromBody] LedConfigurationDto newConfig)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            _ledService.UpdateEffect(userId, newConfig);
            return Ok();
        }

        [HttpPost]
        [Route("effect")]
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

        [HttpPost]
        [Route("setting")]
        public ActionResult<bool> SetLedSettings([FromHeader] string authorization, [FromBody] LedSettingsDto config)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var success = _ledService.ChangeSetting(config, userId);
            return Ok(success);
        }

        [HttpGet]
        [Route("settings")]
        public ActionResult<IEnumerable<LedSettingsDto>> GetAllSettings([FromHeader] string authorization)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var result = _ledService.GetAllSettings(userId);
            var resultDto = result.Select(x => x.ToDto());
            return Ok(resultDto);
        }

        [HttpGet]
        [Route("setting")]
        public ActionResult<LedSettingsDto> SetLedSettings([FromHeader] string authorization)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var newSetting = _ledService.AddSetting(userId);
            var newSettingDto = newSetting.ToDto();
            return Ok(newSettingDto);
        }

        [HttpGet]
        [Route("configfile/{configId}")]
        public ActionResult<string> GetLedConfigFile([FromHeader] string authorization, string configId)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var ledConfig = _ledService.GetSetting(Guid.Parse(configId));
            if(ledConfig == null || !ledConfig.UserId.Equals(userId, StringComparison.InvariantCultureIgnoreCase))
            {
                return null;
            }
            var hostInfo = HttpContext.Request.Host;
            var useHttps = HttpContext.Request.Scheme == "https";
            var host = hostInfo.Host;
            var port = hostInfo.Port ?? (useHttps ? 443 : 80);

            var response = new LedConfigFileDto
            {
                Id = ledConfig.Id.ToString(),
                ServerHost = host,
                ServerPort = port,
                ServerUseHttps = useHttps,
                UserId = ledConfig.UserId,
                ConfigName = ledConfig.SettingName,
                ComPortName = ledConfig.ComPortName
            };
            var jsonString = JsonSerializer.Serialize(response);
            var encodedString = StringUtils.Encode(jsonString);
            var moreEncodedString = StringUtils.Caesar(encodedString, 42);
            return Ok(moreEncodedString);
        }

        [HttpDelete]
        [Route("setting/{id}")]
        public ActionResult<bool> DeleteLedSetting([FromHeader] string authorization, string id)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            var success = _ledService.DeleteSetting(userId, Guid.Parse(id));
            return Ok(success);
        }
    }
}
