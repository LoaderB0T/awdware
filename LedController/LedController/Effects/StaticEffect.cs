namespace LedController.Models.Effects
{
    internal class StaticEffect : LedEffect
    {
        private readonly RgbColor _color;
        public StaticEffect(int ledCount, string name, RgbColor color) : base(ledCount, name)
        {
            _color = color;
        }
        public override byte[] Render()
        {
            if (TimePassed(1000))
            {
                LEDs.SetAll(_color);
                return LEDs.ToByteArray();
            }
            return null;
        }
    }
}
