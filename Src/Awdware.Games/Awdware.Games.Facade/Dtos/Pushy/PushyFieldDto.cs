using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Facade.Dtos.Pushy
{
    public class PushyFieldDto
    {
        public IEnumerable<IEnumerable<PushySquareDto>> Squares { get; set; }
    }
}
