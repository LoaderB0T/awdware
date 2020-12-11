using Awdware.Led.Facade.Dtos;

namespace Awdware.Led.Facade.Interfaces
{
    public interface ILedController
    {
        LedImageDto GetLedImage(uint ledCount);
    }
}
