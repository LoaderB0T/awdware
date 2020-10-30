namespace Awdware.Core.Data.Facade.Entities
{
    public enum ConfirmType
    {
        Unknown = 0,
        EmailConfirmation = 1,
        PasswordReset = 2
    }

    public enum WebUserPermission
    {
        Unknown = 0,
        User = 1,
        Moderator = 2,
        Admin = 3,
        Operator = 4
    }

}
