using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Static
{
    public enum EmailType
    {
        EMAIL_CONFIRMATION,
        PASSWORD_RESET,
        PASSWORD_RESET_NO_USER,
        FORGOT_USERNAME
    }
}
