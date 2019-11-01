namespace WebApi.Dtos
{
    public enum RegisterResult
    {
        UNKNOWN = 0,
        SUCCESS = 1,
        USERNAME_TAKEN = 2,
        EMAIL_TAKEN = 3,
        PASSWORDS_NOT_MATCHING = 4,
        MISSING_INFORMATION = 5
    }
}
