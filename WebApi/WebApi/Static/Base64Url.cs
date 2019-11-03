using System;

namespace WebApi.Helper
{
    public static class Base64Url
    {
        public static string Encode(byte[] arg)
        {
            if (arg == null)
            {
                throw new ArgumentNullException(nameof(arg));
            }

            var s = Convert.ToBase64String(arg);
            return s
                .Replace("=", "", StringComparison.OrdinalIgnoreCase)
                .Replace("/", "_", StringComparison.OrdinalIgnoreCase)
                .Replace("+", "-", StringComparison.OrdinalIgnoreCase);
        }

        public static string ToBase64(string arg)
        {
            if (arg == null)
            {
                throw new ArgumentNullException(nameof(arg));
            }

            var s = arg
                    .PadRight(arg.Length + (4 - arg.Length % 4) % 4, '=')
                    .Replace("_", "/", StringComparison.OrdinalIgnoreCase)
                    .Replace("-", "+", StringComparison.OrdinalIgnoreCase);

            return s;
        }

        public static byte[] Decode(string arg)
        {
            var decrypted = ToBase64(arg);

            return Convert.FromBase64String(decrypted);
        }
    }
}
