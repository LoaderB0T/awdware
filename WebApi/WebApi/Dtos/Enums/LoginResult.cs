using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public enum LoginResult
    {
        UNKNOWN = 0,
        SUCCESS = 1,
        WRONG_USERNAME = 2,
        WRONG_PASSWORD = 3
    }
}
