using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.Enums
{
    public enum ConfirmEmailStatus
    {
        UNKNOWN_LINK = 0,
        EXPIRED_LINK = 1,
        SUCCESS = 3
    }
}
