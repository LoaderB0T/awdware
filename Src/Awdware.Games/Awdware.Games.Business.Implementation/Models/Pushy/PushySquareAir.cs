using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Awdware.Games.Facade.Dtos.Pushy;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushySquareAir : PushySquareFixed
    {
        public override bool CollidesWithFigure(PushyField field, PushyFigure figure)
        {
            return false;
        }

        public override PushySquareDto ToDto()
        {
            var dto = base.ToDto();
            dto.SquareType = PushySquareTypeDto.Air;
            return dto;
        }

        internal override PushySquare Copy()
        {
            return new PushySquareAir() { ChildSquares = CopyChildren() };
        }
    }
}
