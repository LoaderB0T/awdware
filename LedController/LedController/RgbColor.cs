using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace LedController
{
    public class RgbColor
    {
        private static Random _rndm = new Random();
        public byte R { get; set; }
        public byte G { get; set; }
        public byte B { get; set; }

        public RgbColor(byte r, byte g, byte b)
        {
            R = r;
            G = g;
            B = b;
        }

        public RgbColor(string hex)
        {
            hex = hex.Replace("#", "");
            var bigint = int.Parse(hex, NumberStyles.HexNumber);

            R = (byte)((bigint >> 16) & 255);
            G = (byte)((bigint >> 8) & 255);
            B = (byte)(bigint & 255);
        }

        private static bool AreSimilar(RgbColor cp1, RgbColor cp2, double perc)
        {
            RgbColor c1 = new RgbColor(0, 0, 0);
            RgbColor c2 = new RgbColor(0, 0, 0);

            c1.R = Math.Min(cp1.R, cp2.R);
            c1.G = Math.Min(cp1.G, cp2.G);
            c1.B = Math.Min(cp1.B, cp2.B);

            c2.R = Math.Max(cp1.R, cp2.R);
            c2.G = Math.Max(cp1.G, cp2.G);
            c2.B = Math.Max(cp1.B, cp2.B);

            return !(c1.R * 1.0 / c2.R < perc
                     || c1.G * 1.0 / c2.G < perc
                     || c1.B * 1.0 / c2.B < perc);
        }

        public static RgbColor GetRandom(bool lessRandom = true, RgbColor oldColor = null)
        {
            byte r;
            byte g;
            byte b;
            if (lessRandom)
            {
                RgbColor returnColor;
                do
                {
                    int rnd = _rndm.Next(0, 6);
                    r = (byte)_rndm.Next(0, 120);
                    g = (byte)_rndm.Next(0, 120);
                    b = (byte)_rndm.Next(0, 120);

                    switch (rnd)
                    {
                        case 0: r = 255; break;
                        case 1: g = 255; break;
                        case 2: b = 255; break;
                        case 3: r = 255; g = 255; break;
                        case 4: r = 255; b = 255; break;
                        case 5: g = 255; b = 255; break;
                        default:
                            break;
                    }
                    returnColor = new RgbColor(r, g, b);
                } while (oldColor != null && AreSimilar(returnColor, oldColor, 0.2));
                return returnColor;
            }
            else
            {
                r = (byte)_rndm.Next(0, 256);
                g = (byte)_rndm.Next(0, 256);
                b = (byte)_rndm.Next(0, 256);
                return new RgbColor(r, g, b);
            }

        }
    }
}
