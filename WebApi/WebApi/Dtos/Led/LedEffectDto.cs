using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.Led
{
    public class LedEffectDto
    {
        public LedEffectKind EffectKind { get; set; }
        public IEnumerable<LedEffectPropertyDto> Properties { get; set; }
    }
}
