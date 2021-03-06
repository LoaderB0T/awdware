using System.Collections.Generic;

namespace Awdware.Led.Facade.Dtos
{
    public class LedEffectDto
    {
        public LedEffectKind EffectKind { get; set; }
        public IEnumerable<LedEffectPropertyDto> Properties { get; set; }
    }
}
