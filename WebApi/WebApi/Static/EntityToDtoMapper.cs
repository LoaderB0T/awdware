using WebApi.Dtos;
using WebApi.Entities;

namespace WebApi.Mapper
{
    public static class EntityToDtoMapper
    {
        public static LoginResponseDto ConvertToLoginResponseDto(this WebUser user)
        {
            return new LoginResponseDto()
            {
                UserInfo = user.ConvertToUserInfoDto(),
                LoginSuccess = LoginResult.SUCCESS
            };
        }

        public static UserInfoDto ConvertToUserInfoDto(this WebUser user)
        {
            return new UserInfoDto()
            {
                UserId = user.UserId,
                Username = user.Username,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email
            };
        }

        public static RegisterResponseDto ConvertToRegisterResponseDto(this WebUser user)
        {
            return new RegisterResponseDto()
            {
                RegisterSuccess = RegisterResult.SUCCESS,
                UserInfo = user.ConvertToUserInfoDto()
            };
        }
    }
}
