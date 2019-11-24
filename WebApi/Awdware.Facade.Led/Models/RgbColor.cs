using System;
using System.Globalization;
using Awdware.Facade.Led.Dtos;

namespace Awdware.Facade.Led.Models
{
    public class RgbColor
    {
        private static Random _rndm = new Random();
        public byte R { get; set; }
        public byte G { get; set; }
        public byte B { get; set; }

        /// <summary>
        /// Creates a new color based on rgb values.
        /// </summary>
        /// <param name="r">Red part of the color.</param>
        /// <param name="g">Green part of the color.</param>
        /// <param name="b">Blue part of the color.</param>
        public RgbColor(byte r, byte g, byte b)
        {
            R = r;
            G = g;
            B = b;
        }

        /// <summary>
        /// Creates a new color based on an led dto.
        /// </summary>
        /// <param name="dto">The dto to convert into the model.</param>
        public RgbColor(RgbColorDto dto)
        {
            R = dto.R;
            G = dto.G;
            B = dto.B;
        }

        /// <summary>
        /// Returns a dto representation of the instance.
        /// </summary>
        /// <returns>The converted dto.</returns>
        public RgbColorDto ToDto()
        {
            return new RgbColorDto()
            {
                R = R,
                G = G,
                B = B
            };
        }

        /// <summary>
        /// Creates a new color based on a hex string.
        /// </summary>
        /// <param name="hex">Hex string representation of a RGB Color in the format '#000000'.</param>
        public RgbColor(string hex)
        {
            ContractCheck.ArgumentMatchesRegex(hex, nameof(hex), @"^#[0-9a-fA-F]{6}$");
            hex = hex.Replace("#", "", StringComparison.InvariantCultureIgnoreCase);
            var bigint = int.Parse(hex, NumberStyles.HexNumber, CultureInfo.InvariantCulture);

            R = (byte)((bigint >> 16) & 255);
            G = (byte)((bigint >> 8) & 255);
            B = (byte)(bigint & 255);
        }

        /// <summary>
        /// Returns a new instance created from a dto.
        /// </summary>
        /// <returns>The new instance.</returns>
        internal static RgbColor FromDto(RgbColorDto dto)
        {
            return new RgbColor(dto);
        }

        /// <summary>
        /// Checks whether two colors are similar to each other.
        /// </summary>
        /// <param name="colorA">First color for comparison.</param>
        /// <param name="colorB">Gets compared to colorA.</param>
        /// <param name="percentage">How similar the colors have to be between 0 and 1.</param>
        public static bool AreSimilar(RgbColor colorA, RgbColor colorB, float percentage)
        {
            ContractCheck.ValidPercentage(percentage, nameof(percentage));
            ContractCheck.ArgumentNotNull(colorA, nameof(colorA));
            ContractCheck.ArgumentNotNull(colorB, nameof(colorB));

            RgbColor c1 = new RgbColor(0, 0, 0);
            RgbColor c2 = new RgbColor(0, 0, 0);

            c1.R = Math.Min(colorA.R, colorB.R);
            c1.G = Math.Min(colorA.G, colorB.G);
            c1.B = Math.Min(colorA.B, colorB.B);

            c2.R = Math.Max(colorA.R, colorB.R);
            c2.G = Math.Max(colorA.G, colorB.G);
            c2.B = Math.Max(colorA.B, colorB.B);

            return !(c1.R * 1.0 / c2.R < percentage
                     || c1.G * 1.0 / c2.G < percentage
                     || c1.B * 1.0 / c2.B < percentage);
        }

        /// <summary>
        /// Sets new rgb values.
        /// </summary>
        /// <param name="r">Red part of the color.</param>
        /// <param name="g">Green part of the color.</param>
        /// <param name="b">Blue part of the color.</param>
        public void SetColor(byte r, byte g, byte b)
        {
            this.R = r;
            this.G = g;
            this.B = b;
        }

        /// <summary>
        /// Sets new rgb values based on another color instance.
        /// </summary>
        /// <param name="col">The source for the new rgb values.</param>
        public void SetColor(RgbColor col)
        {
            R = col.R;
            G = col.G;
            B = col.B;
        }

        /// <summary>
        /// Generates a random color.
        /// </summary>
        /// <returns>The new generated random color.</returns>
        public static RgbColor GetRandom()
        {
            var r = (byte)_rndm.Next(0, 256);
            var g = (byte)_rndm.Next(0, 256);
            var b = (byte)_rndm.Next(0, 256);
            return new RgbColor(r, g, b);
        }

        /// <summary>
        /// Generates a random color that differs at least 20% from another color and has a higher chance for distinct colors.
        /// </summary>
        /// <param name="differFromThis">Color the generated color should differ from.</param>
        /// <returns>The new generated random color.</returns>
        public static RgbColor GetRandom(RgbColor differFromThis)
        {
            if (differFromThis == null)
            {
                return GetRandom();
            }
            byte r;
            byte g;
            byte b;
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
            } while (differFromThis != null && AreSimilar(returnColor, differFromThis, 0.2f));
            return returnColor;
        }

        /// <summary>
        /// Transitions from color to another.
        /// </summary>
        /// <param name="colorB">The color to transition from.</param>
        /// <param name="colorA">The color to transition to.</param>
        /// <param name="percentage">The percentage of the transition progress (values between 0 and 1).</param>
        /// <param name="evenColors">Color the generated color should differ from.</param>
        /// <returns>The new generated random color.</returns>
        public static RgbColor Transition(RgbColor colorA, RgbColor colorB, float percentage, bool evenColors = true)
        {
            ContractCheck.ValidPercentage(percentage, nameof(percentage));
            ContractCheck.ArgumentNotNull(colorA, nameof(colorA));
            ContractCheck.ArgumentNotNull(colorB, nameof(colorB));

            byte rd;
            byte gd;
            byte bd;
            if (evenColors)
            {
                rd = (byte)(colorA.R - ((colorA.R - colorB.R) * percentage));
                gd = (byte)(colorA.G - ((colorA.G - colorB.G) * percentage));
                bd = (byte)(colorA.B - (byte)((colorA.B - colorB.B) * percentage));
            }
            else
            {
                percentage = 1 - percentage;
                rd = CalcColors(colorA.R, colorB.R, percentage);
                gd = CalcColors(colorA.G, colorB.G, percentage);
                bd = CalcColors(colorA.B, colorB.B, percentage);
            }

            return new RgbColor(rd, gd, bd);
        }

        private static byte CalcColors(byte c1, byte c2, double prog)
        {
            int progInt = (int)(255 * prog);
            if (c2 > c1)
            {
                if (c2 - progInt > c1)
                {
                    return (byte)(c2 - progInt);
                }
                else
                {
                    return c1;
                }
            }
            else
            {
                if (c2 + progInt < c1)
                {
                    return (byte)(c2 + progInt);
                }
                else
                {
                    return c1;
                }
            }
        }

        public override bool Equals(object obj)
        {
            return obj is RgbColor color &&
                   R == color.R &&
                   G == color.G &&
                   B == color.B;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(R, G, B);
        }
    }
}
