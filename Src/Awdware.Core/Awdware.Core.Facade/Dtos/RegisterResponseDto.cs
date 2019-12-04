namespace Awdware.Core.Facade.Dtos
{
    public class RegisterResponseDto
    {
        public RegisterResult RegisterSuccess { get; set; }
        public UserDetailsDto UserInfo { get; set; }
        public string Token { get; set; }
    }
}
