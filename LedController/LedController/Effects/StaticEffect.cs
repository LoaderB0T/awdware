using System;
using System.Collections.Generic;
using System.Text;

namespace LedController.Models.Effects
{
    public class StaticEffect : LedEffect
    {
        private RgbColor _color;
        public StaticEffect(int ledCount, string name, RgbColor color): base(ledCount, name)
        {
            _color = color;
        }
        public override byte[] Render()
        {
            var a = new List<byte>();
            for (int i = 0; i < LedCount; i++)
            {
                a.Add((byte)_color.R);
                a.Add((byte)_color.G);
                a.Add((byte)_color.B);
            }
            return a.ToArray();
        }
    }
}
