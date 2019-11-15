using System;
using System.Text;

namespace Awdware.Infrastructure.Helper
{
    public static class StringUtils
    {
        public static string Encode(string arg)
        {
            if (arg == null)
            {
                throw new ArgumentNullException(nameof(arg));
            }

            var bytes = Encoding.UTF8.GetBytes(arg);

            var s = Convert.ToBase64String(bytes);
            return s
                .Replace("=", "", StringComparison.InvariantCultureIgnoreCase)
                .Replace("/", "_", StringComparison.InvariantCultureIgnoreCase)
                .Replace("+", "-", StringComparison.InvariantCultureIgnoreCase);
        }

        public static string ToBase64(string arg)
        {
            if (arg == null)
            {
                throw new ArgumentNullException(nameof(arg));
            }

            var s = arg
                    .PadRight(arg.Length + (4 - arg.Length % 4) % 4, '=')
                    .Replace("_", "/", StringComparison.InvariantCultureIgnoreCase)
                    .Replace("-", "+", StringComparison.InvariantCultureIgnoreCase);

            return s;
        }

        public static string Decode(string arg)
        {
            var decrypted = ToBase64(arg);

            var bytes = Convert.FromBase64String(decrypted);

            return Encoding.UTF8.GetString(bytes);
        }

        public static string Caesar(this string source, short shift)
        {
            if (source == null)
                return null;
            var maxChar = Convert.ToInt32(char.MaxValue);
            var minChar = Convert.ToInt32(char.MinValue);

            var buffer = source.ToCharArray();

            for (var i = 0; i < buffer.Length; i++)
            {
                var shifted = Convert.ToInt32(buffer[i]) + shift;

                if (shifted > maxChar)
                {
                    shifted -= maxChar;
                }
                else if (shifted < minChar)
                {
                    shifted += maxChar;
                }

                buffer[i] = Convert.ToChar(shifted);
            }

            return new string(buffer);
        }
    }
}
