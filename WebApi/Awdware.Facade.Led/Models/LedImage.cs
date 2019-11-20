﻿using Awdware.Facade.Led.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Facade.Led.Models
{
    public class LedImage
    {
        public List<RgbColor> Leds { get; private set; }
        public uint LedCount { get; private set; }

        /// <summary>
        /// Creates a new led image.
        /// </summary>
        /// <param name="ledCount">Number of available leds (has to match the hardware!).</param>
        public LedImage(uint ledCount)
        {
            this.LedCount = ledCount;
            this.Leds = new List<RgbColor>();
            for (int i = 0; i < ledCount; i++)
            {
                this.Leds.Add(new RgbColor(0, 0, 0));
            }
        }

        /// <summary>
        /// Returns a dto representation of the instance.
        /// </summary>
        /// <returns>The converted dto.</returns>
        public LedImageDto ToDto()
        {
            return new LedImageDto()
            {
                Leds = Leds.Select(
                    x => new RgbColorDto()
                    {
                        R = x.R,
                        G = x.G,
                        B = x.B,
                    }).ToArray()
            };
        }

        /// <summary>
        /// Sets all colors of the image to a new color.
        /// </summary>
        /// <param name="color">The new color.</param>
        public void SetAll(RgbColor color)
        {
            this.Leds.ForEach(x => x.SetColor(color));
        }

        /// <summary>
        /// Sets all colors of the image to a new color.
        /// </summary>
        /// <param name="r">The red part of the new color.</param>
        /// <param name="g">The green part of the new color.</param>
        /// <param name="b">The blue part of the new color.</param>
        public void SetAll(byte r, byte g, byte b)
        {
            this.Leds.ForEach(x => x.SetColor(r,g,b));
        }
    }
}