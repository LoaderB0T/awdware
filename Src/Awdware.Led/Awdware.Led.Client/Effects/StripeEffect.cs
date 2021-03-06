﻿using Awdware.Led.Facade.Models;
using System;

namespace LedController.Models.Effects
{
    internal class StripeEffect : LedEffect
    {
        private int _progress = 0;
        private sbyte _direction = 1;
        private readonly RgbColor _color;
        private readonly RgbColor _bgcolor;
        private readonly int _speed;
        private readonly bool _switchDirection;
        private readonly bool _twoSides;
        private readonly bool _music;

        public StripeEffect(uint ledCount, string name, RgbColor color, RgbColor bgcolor, int speed, bool switchDirection, bool twoSides) : base(ledCount, name)
        {
             _color = color;
            _bgcolor = bgcolor;
            _speed = speed;
            _switchDirection = switchDirection;
            _twoSides = twoSides;
        }

        public override byte[] Render()
        {
            if (FirstFrame)
            {
                if (_switchDirection)
                {
                    Image.SetAll(_color);
                }
                else
                {
                    Image.SetAll(_bgcolor);
                }
            }
            if (TimePassed(_speed))
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

                return Image.ToByteArray();
            }
            return null;
        }

        private void RenderOneDirection(sbyte direction)
        {
            var nextIndex = _progress + _direction;
            if (nextIndex < 0 || nextIndex >= LedCount)
            {
                _direction *= -1;
                nextIndex = _progress;
            }
            Image.Leds[nextIndex] = _direction == direction ? _color : _bgcolor;
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
            Image.Leds[nextIndex] = _direction == direction ? _color : _bgcolor;
            Image.Leds[(int)LedCount - nextIndex - 1] = _direction == direction ? _color : _bgcolor;
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
