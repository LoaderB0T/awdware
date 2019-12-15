using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Awdware.Games.Facade.Dtos.Pushy;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushySquareWall : PushySquareFixed
    {
        public override bool CanStepOnField(PushyField field, PushyFigure figure, PushyMoveDirection dir)
        {
            return false;
        }

        public override bool CollidesWithFigure(PushyField field, PushyFigure figure)
        {
            return true;
        }

        public override PushySquareDto ToDto()
        {
            var dto = base.ToDto();
            dto.SquareType = PushySquareTypeDto.Wall;
            return dto;
        }
    }
}
