using Awdware.Facade.Led.Dtos;

namespace Awdware.Facade.Led.Interfaces
{
    public interface ILedController
    {
        public LedImageDto GetLedImage(uint ledCount);
    }
}
