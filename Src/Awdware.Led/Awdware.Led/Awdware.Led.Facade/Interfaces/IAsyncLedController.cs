using Awdware.Led.Facade.Dtos;
using System.Threading.Tasks;

namespace Awdware.Led.Facade.Interfaces
{
    public interface IAsyncLedController
    {
        public Task<LedImageDto> GetLedImage(uint ledCount);
    }
}
