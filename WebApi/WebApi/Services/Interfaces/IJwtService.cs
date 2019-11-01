namespace WebApi.Services
{
    public interface IJwtService
    {
        string CreateToken(string userId);
        bool IsValidUserToken(string token);
    }
}
