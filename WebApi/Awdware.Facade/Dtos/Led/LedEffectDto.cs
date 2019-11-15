using System.Collections.Generic;

namespace Awdware.Facade.Dtos.Led
{
    public class LedEffectDto
    {
        public LedEffectKind EffectKind { get; set; }
        public IEnumerable<LedEffectPropertyDto> Properties { get; set; }
    }
}
