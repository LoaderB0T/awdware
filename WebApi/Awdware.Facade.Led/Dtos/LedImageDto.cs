using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Facade.Led.Dtos
{
    public class LedImageDto
    {
        public IEnumerable<RgbColorDto> Leds { get; set; }
    }
}
