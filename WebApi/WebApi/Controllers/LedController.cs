using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
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
        [Route("configurations")]
        public ActionResult<UserInfoDto> GetMyUserInfo([FromHeader] string authorization)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            return Ok(_ledService.GetConfigurations(userId));
        }
    }
}
