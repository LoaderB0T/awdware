using Awdware.Facade.Led.Models;

namespace LedController.Models.Effects
{
    internal class StaticEffect : LedEffect
    {
        private readonly RgbColor _color;
        public StaticEffect(uint ledCount, string name, RgbColor color) : base(ledCount, name)
        {
            _color = color;
        }
        public override byte[] Render()
        {
            if (TimePassed(1000))
            {
                Image.SetAll(_color);
                return Image.ToByteArray();
            }
            return null;
        }
    }
}
