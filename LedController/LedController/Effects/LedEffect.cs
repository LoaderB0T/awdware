using Awdware.Facade.Led.Models;
using System;
using System.Collections.Generic;

namespace LedController.Models.Effects
{
    public abstract class LedEffect
    {
        public string Name { get; set; }
        protected DateTime LastRenderTime { get; private set; }
        protected uint LedCount { get; private set; }
        protected bool FirstFrame { get; set; }
        protected Random Rndm { get; set; }
        protected LedImage Image { get; private set; }

        public abstract byte[] Render();
        protected LedEffect(uint ledCount, string name)
        {
            this.Name = name;
            this.LedCount = ledCount;
            Rndm = new Random();
            LastRenderTime = DateTime.UtcNow.AddDays(-1);
            Image = new LedImage(ledCount);
            FirstFrame = true;
        }
        protected int RndmIndex()
        {
            return Rndm.Next((int)LedCount);
        }

        protected bool TimePassed(int millis)
        {
            return DateTime.UtcNow - LastRenderTime > TimeSpan.FromMilliseconds(millis);
        }

        internal void Rendered()
        {
            LastRenderTime = DateTime.UtcNow;
            if(FirstFrame)
            {
                FirstFrame = false;
            }
        }
    }

    public static class LedExtentions
    {
        public static byte[] ToByteArray(this LedImage image)
        {
            if (image == null)
            {
                throw new ArgumentNullException(nameof(image));
            }
            var result = new byte[image.Leds.Count * 3];
            for (int i = 0; i < image.Leds.Count; i++)
            {
                result[i * 3 + 0] = image.Leds[i].G;
                result[i * 3 + 1] = image.Leds[i].R;
                result[i * 3 + 2] = image.Leds[i].B;
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
