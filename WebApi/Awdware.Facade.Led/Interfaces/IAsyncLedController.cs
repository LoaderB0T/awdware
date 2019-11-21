using Awdware.Facade.Led.Dtos;
using System.Threading.Tasks;

namespace Awdware.Facade.Led.Interfaces
{
    interface IAsyncLedController
    {
        public Task<LedImageDto> GetLedImage(uint ledCount);
    }
}
