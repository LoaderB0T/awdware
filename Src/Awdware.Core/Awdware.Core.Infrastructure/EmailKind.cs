namespace Awdware.Core.Infrastructure.Helper
{
    public enum EmailKind
    {
        Unknown = 0,
        EmailConfirmation = 1,
        PasswordReset = 2,
        PasswordResetNoUser = 3,
        ForgotUsername = 4
    }
}
