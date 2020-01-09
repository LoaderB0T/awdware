using System.Collections.Generic;

namespace Awdware.Games.Facade.Dtos.Pushy
{
    public class PushySquareDto
    {
        public PushySquareTypeDto SquareType { get; set; }
        public IEnumerable<PushySquareDto> ChildSquares { get; set; }
        public IEnumerable<PushySquareDto> Figures { get; set; }
        public PushyColor? Color { get; set; }
        public string UserId { get; set; }
    }
}