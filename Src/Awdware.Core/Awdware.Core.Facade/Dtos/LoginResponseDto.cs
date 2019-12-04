namespace Awdware.Core.Facade.Dtos
{
    public class LoginResponseDto
    {
        public LoginResult LoginSuccess { get; set; }
        public UserDetailsDto UserInfo { get; set; }
        public string Token { get; set; }
    }
}
