using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;

namespace WebApi.Services
{
    public interface IUserService
    {
        UserInfoDto GetMyUserInfo(string userId);
        RegisterResult RegisterRequestValid(RegisterRequestDto registerRequestDto);
    }
}
