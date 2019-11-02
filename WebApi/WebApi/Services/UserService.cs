using WebApi.Dtos;
using WebApi.Repositories;
using WebApi.Mapper;
using WebApi.Static;

namespace WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;

        public UserService(
            IUserRepository userRepository,
            IJwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
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
                return RegisterResult.MISSING_INFORMATION;
            }

            if (registerRequestDto.Password != registerRequestDto.Password2)
            {
                return RegisterResult.PASSWORDS_NOT_MATCHING;
            }

            bool usernameTaken = _userRepository.CheckIfUsernameExists(registerRequestDto.Username);
            if (usernameTaken)
                return RegisterResult.USERNAME_TAKEN;

            bool emailTaken = _userRepository.CheckIfEmailExists(registerRequestDto.Email);
            if (emailTaken)
                return RegisterResult.EMAIL_TAKEN;

            return RegisterResult.SUCCESS;
        }
    }
}
