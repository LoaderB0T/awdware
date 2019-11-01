using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        public IActionResult Index()
        {
            var a = new UserInfoDto
            {
                Email = "works@yes.de",
                UserId = "123123123",
                Username = "testUser"
            };
            return Ok(a);
        }
    }
}