using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Awdware.Led.Facade
{
    internal class ContractCheck
    {
        internal static void ArgumentNotNull<T>(T argument, string argumentName, string message = null)
        {
            if (argument == null)
            {
                if (message != null)
                {
                    throw new ArgumentNullException(argumentName, message);
                }
                else
                {
                    throw new ArgumentNullException(argumentName);
                }
            }
        }

        internal static void ValidPercentage(float argument, string argumentName)
        {
            if (argument < 0 || argument > 1)
            {
                throw new ArgumentOutOfRangeException(argumentName, argumentName + " only allows values between 0 and 1");
            }
        }

        internal static void ArgumentNotNullOrEmpty(string value, string argumentName)
        {
            if (value == null)
            {
                throw new ArgumentNullException(argumentName);
            }
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException(argumentName + " cannot be an empty string", argumentName);
            }
        }

        internal static void ArgumentMatchesRegex(string value, string argumentName, string regex)
        {
            ArgumentNotNullOrEmpty(value, argumentName);
            var reg = new Regex(regex);
            if (!reg.IsMatch(value))
            {
                throw new ArgumentException("Argument " + argumentName + " does not match the required format", argumentName);
            }
        }
    }
}
