using System;
using System.Collections.Generic;
using System.Text;

namespace LedController.Models.Effects
{
    public class PixelEffect : LedEffect
    {
        private RgbColor _color;
        private RgbColor _bgcolor;
        private double[] _pixelArray;
        private int _speed;
        private int _count;
        private bool _evenColors;
        public PixelEffect(int ledCount, string name, RgbColor color, RgbColor bgcolor, int speed, int count, bool evenColors) : base(ledCount, name)
        {
            _pixelArray = new double[ledCount];
            _color = color;
            _bgcolor = bgcolor;
            _speed = speed;
            _count = count;
            _evenColors = evenColors;
        }
        public override byte[] Render()
        {
            if (DateTime.UtcNow - LastRenderTime > TimeSpan.FromMilliseconds(5))
            {
                if (FirstFrame)
                {
                    LEDs.SetAll(_bgcolor);
                    FirstFrame = false;
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
                        LEDs[i].SetColor(newColor);
                    }
                    else
                    {
                        LEDs[i].SetColor(_bgcolor);
                    }
                }
                LastRenderTime = DateTime.UtcNow;
                return LEDs.ToByteArray();
            }
            else
            {
                return null;
            }
        }
    }
}
