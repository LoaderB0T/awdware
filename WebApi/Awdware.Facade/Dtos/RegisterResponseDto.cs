namespace Awdware.Facade.Dtos
{
    public class RegisterResponseDto
    {
        public RegisterResult RegisterSuccess { get; set; }
        public UserInfoDto UserInfo { get; set; }
        public string Token { get; set; }
    }
}
