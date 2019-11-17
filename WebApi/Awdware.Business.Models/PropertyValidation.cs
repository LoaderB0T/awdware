using System.Text.RegularExpressions;

namespace Awdware.Business.Utils
{
    public static class PropertyValidation
    {
        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            var emailPattern = new Regex("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");
            return emailPattern.IsMatch(email);
        }

        public static bool IsValidUsername(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return false;

            var usernamePattern = new Regex("^[a-zA-Z0-9]{4,20}$");
            var res = usernamePattern.IsMatch(username);
            return res;
        }

        public static bool IsValidName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return false;

            var namePattern = new Regex("^((?![\\<\\>\\+\\\\]).)*$"); //Forbidden Chars with negative lookahead
            return namePattern.IsMatch(name);
        }

        public static bool IsValidPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                return false;
            if (password.Length < 8)
                return false;

            var passwordContainsLowercasePattern = new Regex("^.*[a-z]+.*$");
            var passwordContainsUppercasePattern = new Regex("^.*[A-Z]+.*$");
            var passwordContainsDigitPattern = new Regex("^.*[0-9]+.*$");
            var passwordContainsSpecialCharPattern = new Regex("^.*[\\W_]+.*$");
            return
                passwordContainsLowercasePattern.IsMatch(password)
                && passwordContainsUppercasePattern.IsMatch(password)
                && (passwordContainsDigitPattern.IsMatch(password)
                || passwordContainsSpecialCharPattern.IsMatch(password));
        }
    }
}
