namespace Awdware.Facade.Led.Dtos
{
    public class LedImageDto
    {
        public RgbColorDto[] Leds { get; set; }
        public int TransitionTime { get; set; }
    }
}
