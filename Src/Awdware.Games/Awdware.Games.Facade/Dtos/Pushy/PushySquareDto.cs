using System.Collections.Generic;

namespace Awdware.Games.Facade.Dtos.Pushy
{
    public class PushySquareDto
    {
        public PushySquareType SquareType { get; set; }
        public IEnumerable<PushySquareDto> ChildSquares { get; set; }
    }
}