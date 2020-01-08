using Awdware.Games.Facade.Dtos.Pushy;
using System;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushySquareBox : PushySquareMoveable
    {
        public override bool CanBeMovedToField(PushyField field, PushySquare square, PushyMoveDirection dir)
        {
            if(square is PushySquareAir)
            {
                return true;
            }
            return false;
            throw new NotImplementedException();
        }

        public override bool CanStepOnField(PushyField field, PushyFigure figure, PushyMoveDirection dir)
        {
            var myCoords = field.GetSquareCoords(this);
            var relativePos = myCoords.GetRelativePos(dir, field);
            if (relativePos == null)
                return false;

            var targetSquare = field.Squares[relativePos.X][relativePos.Y];

            return this.CanBeMovedToField(field, targetSquare, dir);
        }

        public override bool CollidesWithFigure(PushyField field, PushyFigure figure)
        {
            throw new NotImplementedException();
        }

        public override void StepOnField(PushyField pushyField, PushyFigure figure, PushyMoveDirection dir)
        {
            throw new NotImplementedException();
        }

        public override PushySquareDto ToDto()
        {
            var dto = base.ToDto();
            dto.SquareType = PushySquareTypeDto.Box;
            return dto;
        }
    }
}
