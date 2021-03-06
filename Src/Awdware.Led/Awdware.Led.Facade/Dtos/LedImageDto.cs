namespace Awdware.Led.Facade.Dtos
{
    public class LedImageDto
    {
        public RgbColorDto[] Leds { get; set; }
        public int TransitionTime { get; set; }
    }
}
