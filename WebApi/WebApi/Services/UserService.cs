using WebApi.Dtos;
using WebApi.Repositories;
using WebApi.Mapper;
using WebApi.Helper;

namespace WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(
            IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public UserInfoDto GetMyUserInfo(string userId)
        {
            var userEntity = _userRepository.GetUserById(userId);
            var foreignUserDto = userEntity.ToUserInfoDto();
            return foreignUserDto;
        }

        public RegisterResult RegisterRequestValid(RegisterRequestDto registerRequestDto)
        {

            if (
                !PropertyValidation.IsValidEmail(registerRequestDto.Email)
                || !PropertyValidation.IsValidUsername(registerRequestDto.Username)
                || !PropertyValidation.IsValidName(registerRequestDto.Firstname)
                || !PropertyValidation.IsValidName(registerRequestDto.Lastname)
                || !PropertyValidation.IsValidPassword(registerRequestDto.Password)
                || !PropertyValidation.IsValidPassword(registerRequestDto.Password2)
                )
            {
                return RegisterResult.MissingInformation;
            }

            if (registerRequestDto.Password != registerRequestDto.Password2)
            {
                return RegisterResult.PasswordMismatch;
            }

            bool usernameTaken = _userRepository.CheckIfUsernameExists(registerRequestDto.Username);
            if (usernameTaken)
                return RegisterResult.UsernameTaken;

            bool emailTaken = _userRepository.CheckIfEmailExists(registerRequestDto.Email);
            if (emailTaken)
                return RegisterResult.EmailTaken;

            return RegisterResult.Success;
        }
    }
}
