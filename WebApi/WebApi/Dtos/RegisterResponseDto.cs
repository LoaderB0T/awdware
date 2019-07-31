using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class RegisterResponseDto
    {
        public RegisterResult RegisterSuccess { get; set; }
        public UserInfoDto UserInfo { get; set; }
        public string Token { get; set; }
    }
}
