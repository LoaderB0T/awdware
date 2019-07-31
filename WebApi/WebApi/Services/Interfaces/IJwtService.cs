using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Services
{
    public interface IJwtService
    {
        string CreateToken(string userId);
        bool IsValidUserToken(string token);
    }
}
