using System;
using System.Collections.Generic;
using System.Text;

namespace LedController.Models.Effects
{
    public class PixelEffect : LedEffect
    {
        private RgbColor _color;
        private RgbColor _bgcolor;
        private int _speed;
        private int _count;
        private bool _evenColors;
        public PixelEffect(int ledCount, string name, RgbColor color, RgbColor bgcolor, int speed, int count, bool evenColors) : base(ledCount, name)
        {
            _color = color;
            _bgcolor = bgcolor;
            _speed = speed;
            _count = count;
            _evenColors = evenColors;
        }
        public override byte[] Render()
        {
            if (DateTime.UtcNow - lastRenderTime > TimeSpan.FromMilliseconds(_speed))
            {
                if (rndm.Next(1000) < _count)
                {
                    var index = RndmIndex();
                    LEDs[index].R = _color.R;
                    LEDs[index].G = _color.G;
                    LEDs[index].B = _color.B;
                }
                lastRenderTime = DateTime.UtcNow;
                return LEDs.ToByteArray();
            }
            else
            {
                return null;
            }
        }
    }
}
