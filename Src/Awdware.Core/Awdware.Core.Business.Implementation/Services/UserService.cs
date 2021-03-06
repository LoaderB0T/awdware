﻿using System;
using Awdware.Core.Business.Utils;
using Awdware.Core.Data.Facade.Utils;
using Awdware.Core.Data.Implementation.Repositories;
using Awdware.Core.Facade.Dtos;

namespace Awdware.Core.Business.Implementation.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(
            IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public UserDetailsDto GetMyUserDetails(string userId)
        {
            var userEntity = _userRepository.GetUserById(userId);
            var foreignUserDto = userEntity.ToUserDetailsDto();
            return foreignUserDto;
        }

        public RegisterResult RegisterRequestValid(RegisterRequestDto registerRequestDto)
        {
            if (registerRequestDto == null)
                return RegisterResult.Unknown;
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

        public UserInfoDto GetUserInfo(string userId)
        {
            var user = _userRepository.GetUserById(userId);
            return user.ToUserInfoDto();
        }
    }
}
