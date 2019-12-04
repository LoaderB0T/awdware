namespace Awdware.Core.Business.Implementation.Services
{
    public interface IJwtService
    {
        string CreateToken(string userId);
        bool IsValidAccessToken(string token, bool validateLifeTime = true);
        string CreateRefreshToken(string userId);
        bool IsValidRefreshToken(string token);

    }
}
