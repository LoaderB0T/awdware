using System;
using System.Collections.Generic;

namespace LedController.Models.Effects
{
    public abstract class LedEffect
    {
        protected DateTime lastRenderTime;
        protected int ledCount;
        protected Random rndm;
        protected List<RgbColor> LEDs;
        public abstract byte[] Render();
        protected LedEffect(int ledCount)
        {
            this.ledCount = ledCount;
            rndm = new Random();
            lastRenderTime = DateTime.UtcNow;
            LEDs = new List<RgbColor>(ledCount);
            for (int i = 0; i < ledCount; i++)
            {
                LEDs.Add(new RgbColor(0, 0, 0));
            }
        }
        protected int RndmIndex()
        {
            return rndm.Next(ledCount);
        }
    }

    public static class LedExtentions
    {
        public static byte[] ToByteArray(this List<RgbColor> leds)
        {
            var result = new byte[leds.Count * 3];
            for (int i = 0; i < leds.Count; i++)
            {
                result[i * 3 + 0] = leds[i].G;
                result[i * 3 + 1] = leds[i].R;
                result[i * 3 + 2] = leds[i].B;
            }
    
            return result;
        }
    }
}
