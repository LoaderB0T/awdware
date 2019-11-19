using Awdware.Facade.Led.Models;

namespace LedController.Models.Effects
{
    internal class PixelEffect : LedEffect
    {
        private readonly RgbColor _color;
        private readonly RgbColor _bgcolor;
        private readonly float[] _pixelArray;
        private readonly int _speed;
        private readonly int _count;
        private readonly bool _evenColors;
        public PixelEffect(uint ledCount, string name, RgbColor color, RgbColor bgcolor, int speed, int count, bool evenColors) : base(ledCount, name)
        {
            _pixelArray = new float[ledCount];
            _color = color;
            _bgcolor = bgcolor;
            _speed = speed;
            _count = count;
            _evenColors = evenColors;
        }
        public override byte[] Render()
        {
            if (TimePassed(5))
            {
                if (FirstFrame)
                {
                    Image.SetAll(_bgcolor);
                }

                for (int i = 0; i < LedCount; i++)
                {
                    if (_pixelArray[i] > 256)
                    {
                        _pixelArray[i] = _pixelArray[i] - 500 / (256 - _speed) * 4 > 0 ? _pixelArray[i] - 500 / (256 - _speed) * 4 : 0;
                    }
                    else
                    {
                        _pixelArray[i] = _pixelArray[i] - 500 / (256 - _speed) > 0 ? _pixelArray[i] - 500 / (256 - _speed) : 0;
                    }
                }

                if (Rndm.Next(1000) < _count)
                {
                    var index = RndmIndex();
                    if (_pixelArray[index] < 0.1)
                    {
                        _pixelArray[index] = 510;
                    }
                }

                for (int i = 0; i < LedCount; i++)
                {
                    if (_pixelArray[i] != 0)
                    {
                        RgbColor newColor;

                        if (_pixelArray[i] > 255)
                        {
                            newColor = RgbColor.Transition(_color, _bgcolor, 1 - ((_pixelArray[i] - 255) + 1) / 256, _evenColors);
                        }
                        else
                        {
                            newColor = RgbColor.Transition(_color, _bgcolor, (_pixelArray[i] + 1) / 256, _evenColors);
                        }
                        Image.Leds[i] = newColor;
                    }
                    else
                    {
                        Image.Leds[i] = _bgcolor;
                    }
                }
                return Image.ToByteArray();
            }
            return null;
        }
    }
}
