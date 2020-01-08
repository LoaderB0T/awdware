using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Awdware.Games.Facade.Dtos.Pushy;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushySquareAir : PushySquareFixed
    {
        public override bool CanStepOnField(PushyField field, PushyFigure figure, PushyMoveDirection dir)
        {
            if (ChildSquares.Count == 0)
                return true;

            var colliders = GetCollidingChilds(field, figure);
            if (colliders.Count == 0)
                return true;

            var myCoords = field.GetSquareCoords(this);
            var movedCoords = PushyField.GetNewCoords(myCoords.X, myCoords.Y, dir);
            var next = field.Squares[movedCoords.X][movedCoords.Y];

            var blocked = colliders.Any(x => !x.CanBeMovedToField(field, next, dir));

            return !blocked;
        }

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
    }
}
