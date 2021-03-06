using Awdware.Led.Facade.Dtos;
using System.Threading.Tasks;

namespace Awdware.Led.Facade.Interfaces
{
    public interface IAsyncLedController
    {
        Task<LedImageDto> GetLedImage(uint ledCount);
    }
}
