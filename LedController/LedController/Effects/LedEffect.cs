using System;
using System.Collections.Generic;

namespace LedController.Models.Effects
{
    public abstract class LedEffect
    {
        public string Name { get; set; }
        protected DateTime LastRenderTime { get; set; }
        protected int LedCount { get; set; }
        protected bool FirstFrame { get; set; }
        protected Random Rndm { get; set; }
        protected List<RgbColor> LEDs { get; private set; }

        public abstract byte[] Render();
        protected LedEffect(int ledCount, string name)
        {
            this.Name = name;
            this.LedCount = ledCount;
            Rndm = new Random();
            LastRenderTime = DateTime.UtcNow;
            LEDs = new List<RgbColor>(ledCount);
            for (int i = 0; i < ledCount; i++)
            {
                LEDs.Add(new RgbColor(0, 0, 0));
            }
        }
        protected int RndmIndex()
        {
            return Rndm.Next(LedCount);
        }
    }

    public static class LedExtentions
    {
        public static byte[] ToByteArray(this List<RgbColor> leds)
        {
            if(leds == null)
            {
                throw new ArgumentNullException(nameof(leds));
            }
            var result = new byte[leds.Count * 3];
            for (int i = 0; i < leds.Count; i++)
            {
                result[i * 3 + 0] = leds[i].G;
                result[i * 3 + 1] = leds[i].R;
                result[i * 3 + 2] = leds[i].B;
            }
    
            return result;
        }

        public static void SetAll(this List<RgbColor> leds, RgbColor color)
        {
            if (leds == null)
                throw new ArgumentNullException(nameof(leds));
            if (color == null)
                throw new ArgumentNullException(nameof(color));

            leds.ForEach(led => led.SetColor(color));
        }
    }
}
