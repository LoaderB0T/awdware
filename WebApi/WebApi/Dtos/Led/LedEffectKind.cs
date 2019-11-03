using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.Led
{
    public enum LedEffectKind
    {
        UNKNOWN = 0,
        MIX = 1,
        STRIPE = 2,
        STATIC = 3,
        PIXEL = 4,
    }
}
