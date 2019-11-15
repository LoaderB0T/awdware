﻿using LedController.Music;

namespace LedController.Models.Effects
{
    internal class MusicEffect : LedEffect
    {
        private readonly IMusicManager _musicManager;
        private readonly RgbColor _color;
        private readonly RgbColor _bgColor;
        private readonly int _speed;

        public MusicEffect(int ledCount, string name, RgbColor color, RgbColor bgColor, int speed) : base(ledCount, name)
        {
            _musicManager = IMusicManager.GetInstance();
            _color = color;
            _bgColor = bgColor;
            _speed = speed;
        }

        public override byte[] Render()
        {
            if (TimePassed(_speed))
            {
                {
                    var spectrum = _musicManager.GetSpectrum(LedCount, 255);
                    for (int i = 0; i < spectrum.Length; i++)
                    {
                        var val = (double)spectrum[i] / 255;
                        var res = RgbColor.Transition(_bgColor, _color, val, true);
                        LEDs[i].SetColor(res);
                    }
                }
                return LEDs.ToByteArray();
            }
            return null;
        }
    }
}