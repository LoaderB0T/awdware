using System.Collections.Generic;

namespace WebApi.Dtos.Led
{
    public class LedEffectDto
    {
        public LedEffectKind EffectKind { get; set; }
        public IEnumerable<LedEffectPropertyDto> Properties { get; set; }
    }
}
