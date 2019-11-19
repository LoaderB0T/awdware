using Awdware.Facade.Dtos;
using Awdware.Facade.Led.Dtos;
using Awdware.Facade.Led.Interfaces;
using Awdware.Facade.Led.Models;
using Microsoft.AspNetCore.Mvc;

namespace Awdware.Business.Facade.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase, ILedController
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

        [HttpGet]
        [Route("Led/{ledCount}")]
        public LedImageDto GetLedImage(uint ledCount)
        {
            var a = new LedImage(ledCount);
            a.Leds.ForEach(x => x.SetColor(RgbColor.GetRandom()));
            return a.ToDto();
        }
    }
}