using Awdware.Games.Facade.Dtos.Pushy;
using System;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushySquareBox : PushySquareMoveable
    {
        public override bool CollidesWithFigure(PushyField field, PushyFigure figure)
        {
            return true;
        }

        public override bool Entered(PushyField field, PushySquare square, PushyMoveDirection dir)
        {
            if (!(square is PushyFigure))
                return false;
            return this.Move(field, dir);
        }



        public override PushySquareDto ToDto()
        {
            var dto = base.ToDto();
            dto.SquareType = PushySquareTypeDto.Box;
            return dto;
        }

        internal override PushySquare Copy()
        {
            return new PushySquareBox() { ChildSquares = CopyChildren() };
        }
    }
}
