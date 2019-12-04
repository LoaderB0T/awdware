using Awdware.Led.Facade.Dtos;

namespace Awdware.Led.Facade.Interfaces
{
    public interface ILedController
    {
        public LedImageDto GetLedImage(uint ledCount);
    }
}
