using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Enums
{
    public enum ConfirmKeyUsageSuccess
    {
        SUCESS = 0,
        UNKNOWN_KEY = 1,
        EXPIRED_KEY = 2
    }
}
