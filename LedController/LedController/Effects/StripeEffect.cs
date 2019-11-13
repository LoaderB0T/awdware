using LedController.Music;
using NAudio.Dsp;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LedController.Models.Effects
{
    //    this.props.push(new LedEffectColorProperty(1, 'Color', '#FFFFFF'));
    //this.props.push(new LedEffectColorProperty(2, 'Background Color', '#000000'));
    //this.props.push(new LedEffectBoolProperty(3, 'Music Reactive', false));
    //this.props.push(new LedEffectNumberProperty(4, 'Speed', 30, 5, 255));
    //this.props.push(new LedEffectBoolProperty(5, 'Switch Direction', false));
    //this.props.push(new LedEffectBoolProperty(6, 'Two Sides', false));
    class StripeEffect : LedEffect
    {
        private int _progress = 0;
        private sbyte _direction = 1;
        private readonly RgbColor _color;
        private readonly RgbColor _bgcolor;
        private readonly bool _musicReactive;
        private readonly int _speed;
        private readonly bool _switchDirection;
        private readonly bool _twoSides;
        private readonly IMusicManager _musicManager;
        private List<int> _oldChars;

        public StripeEffect(int ledCount, string name, RgbColor color, RgbColor bgcolor, bool musicReactive, int speed, bool switchDirection, bool twoSides) : base(ledCount, name)
        {
            _color = color;
            _bgcolor = bgcolor;
            _musicReactive = musicReactive;
            _speed = speed;
            _switchDirection = switchDirection;
            _twoSides = twoSides;
            _oldChars = new List<int>();
            for (int i = 0; i < 265; i++)
            {
                _oldChars.Add(0);
            }
            if (musicReactive)
            {
                _musicManager = IMusicManager.GetInstance();
            }
        }

        public override byte[] Render()
        {
            if (FirstFrame)
            {
                if (_switchDirection)
                {
                    LEDs.SetAll(_color);
                }
                else
                {
                    LEDs.SetAll(_bgcolor);
                }
            }
            if (TimePassed(_speed))
            {
                if (_musicReactive)
                {
                    var spectrum = _musicManager.GetSpectrum(265, 128);
                    for (int i = 0; i < spectrum.Length; i++)
                    {
                        DrawSpectrumToConsole(i, spectrum[i]);
                    }
                }
                else
                {
                    if (_twoSides)
                    {
                        if (_switchDirection)
                        {
                            RenderTwoSidesSwitchedDirection();
                        }
                        else
                        {
                            RenderTwoSides();
                        }
                    }
                    else
                    {
                        if (_switchDirection)
                        {
                            RenderSwitchedDirection();
                        }
                        else
                        {
                            RenderNormal();
                        }
                    }
                }
                return LEDs.ToByteArray();
            }
            return null;
        }

        private void DrawSpectrumToConsole(int index, int power)
        {
            Console.CursorLeft = index;
            Console.CursorTop = _oldChars[index];
            Console.Write(" ");
            Console.CursorLeft = index;
            Console.CursorTop = power;
            Console.Write("#");
            _oldChars[index] = power;
        }

        private void RenderOneDirection(sbyte direction)
        {
            var nextIndex = _progress + _direction;
            if (nextIndex < 0 || nextIndex >= LedCount)
            {
                _direction *= -1;
                nextIndex = _progress;
            }
            LEDs[nextIndex] = _direction == direction ? _color : _bgcolor;
            _progress = nextIndex;
        }

        private void RenderTwoDirections(sbyte direction)
        {
            var nextIndex = _progress + _direction;
            if (nextIndex < 0 || nextIndex >= Math.Ceiling((decimal)LedCount / 2))
            {
                _direction *= -1;
                nextIndex = _progress;
            }
            LEDs[nextIndex] = _direction == direction ? _color : _bgcolor;
            LEDs[LedCount - nextIndex - 1] = _direction == direction ? _color : _bgcolor;
            _progress = nextIndex;
        }

        private void RenderNormal()
        {
            RenderOneDirection(1);
        }

        private void RenderSwitchedDirection()
        {
            RenderOneDirection(-1);
        }

        private void RenderTwoSides()
        {
            RenderTwoDirections(1);
        }

        private void RenderTwoSidesSwitchedDirection()
        {
            RenderTwoDirections(-1);
        }
    }
}
