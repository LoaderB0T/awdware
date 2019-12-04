using Awdware.Core.Facade.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Awdware.Core.Business.Facade.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public IActionResult Index()
        {
            var a = new UserDetailsDto
            {
                Email = "works@yes.de",
                UserId = "123123123",
                Username = "testUser"
            };
            return Ok(a);
        }
    }
}