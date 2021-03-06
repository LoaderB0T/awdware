using Awdware.Led.Facade.Models;
using LedController.Music;
using System;

namespace LedController.Models.Effects
{
    internal class MusicEffect : LedEffect
    {
        private RgbColor _color;
        private RgbColor _colorBg;
        private readonly int _speed;
        private readonly bool _spectrum;
        private readonly bool _twoSides;
        private readonly bool _switchDirection;
        private int prog = 1;
        private int progDir = 1;
        private IMusicManager _musicManager;

        public MusicEffect(uint ledCount, string name, RgbColor color, RgbColor colorBg, int speed, bool spectrum, bool twoSides, bool switchDirection) : base(ledCount, name)
        {
            _musicManager = IMusicManager.GetInstance();
            _color = color;
            _colorBg = colorBg;
            _speed = speed;
            _spectrum = spectrum;
            _twoSides = twoSides;
            _switchDirection = switchDirection;
        }


        public override byte[] Render()
        {
            if (TimePassed(_speed))
            {
                if (_spectrum)
                {
                    var spectrum = _musicManager.GetSpectrum(20, 100);
                    for (int i = 0; i < 20; i++)
                    {
                        Console.WriteLine(new string('#', spectrum[i]));
                    }



                    //var spectrum = _musicManager.GetSpectrum(LedCount, 255);
                    //for (int i = 0; i < LedCount; i++)
                    //{
                    //    Image.Leds[i].SetColor(RgbColor.Transition(new RgbColor(0, 0, 0), _color, spectrum[i] / 255f));

                    //}
                    return Image.ToByteArray();
                }
                else
                {

                    Image.SetAll(_colorBg);
                    var volume = _musicManager.GetCurrentVolume();

                    if (_twoSides)
                    {
                        for (int i = 0; i < LedCount * volume / 2; i++)
                        {
                            if (_switchDirection)
                            {
                                Image.Leds[(int)LedCount / 2 - i].SetColor(_color);
                                Image.Leds[(int)LedCount / 2 + i].SetColor(_color);
                            }
                            else
                            {
                                Image.Leds[(int)LedCount - i - 1].SetColor(_color);
                                Image.Leds[i].SetColor(_color);
                            }
                        }
                    }
                    else
                    {
                        for (int i = 0; i < LedCount * volume; i++)
                        {
                            if (_switchDirection)
                            {
                                Image.Leds[i].SetColor(_color);
                            }
                            else
                            {
                                Image.Leds[(int)LedCount - i - 1].SetColor(_color);
                            }
                        }
                    }


                    return Image.ToByteArray();
                }
            }
            return null;
        }
    }
}