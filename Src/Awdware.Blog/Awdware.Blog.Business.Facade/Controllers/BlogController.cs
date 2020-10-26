using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Awdware.Core.Business.Implementation.Services;

namespace Awdware.Blog.Business.Facade.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("RegisteredUser")]
    public class BlogController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public BlogController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpDelete]
        [Route("setting/{id}")]
        public ActionResult<bool> DeleteLedSetting([FromHeader] string authorization, string id)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            //var success = _ledService.DeleteSetting(userId, Guid.Parse(id));
            return Ok(userId != null);
        }
    }
}
