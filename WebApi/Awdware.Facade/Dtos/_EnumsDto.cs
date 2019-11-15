namespace Awdware.Facade.Dtos
{
    public enum ConfirmEmailStatus
    {
        Unknown = 0,
        UnknownLink = 0,
        ExpiredLink = 1,
        Success = 3
    }

    public enum LoginResult
    {
        Unknown = 0,
        Success = 1,
        WrongUsername = 2,
        WrongPassword = 3
    }

    public enum RegisterResult
    {
        Unknown = 0,
        Success = 1,
        UsernameTaken = 2,
        EmailTaken = 3,
        PasswordMismatch = 4,
        MissingInformation = 5
    }

    public enum PasswordResetStatus
    {
        Error = 0,
        Success = 1
    }
}
