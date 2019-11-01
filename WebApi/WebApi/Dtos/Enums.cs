namespace WebApi.Dtos
{
    public enum ConfirmEmailStatus
    {
        UNKNOWN_LINK = 0,
        EXPIRED_LINK = 1,
        SUCCESS = 3
    }

    public enum LoginResult
    {
        UNKNOWN = 0,
        SUCCESS = 1,
        WRONG_USERNAME = 2,
        WRONG_PASSWORD = 3
    }

    public enum RegisterResult
    {
        UNKNOWN = 0,
        SUCCESS = 1,
        USERNAME_TAKEN = 2,
        EMAIL_TAKEN = 3,
        PASSWORDS_NOT_MATCHING = 4,
        MISSING_INFORMATION = 5
    }

    public enum PasswordResetStatus
    {
        NO_SUCCESS = 0,
        SUCCESS = 1
    }
}
