using System;
using System.Collections.Generic;
using System.Text;
using Awdware.Games.Facade.Dtos.Pushy;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushyFigure: PushySquareMoveable
    {
        public string UserId { get; set; }

        public override bool CollidesWithFigure(PushyField field, PushyFigure figure)
        {
            return true;
        }

        public override bool Entered(PushyField field, PushySquare square, PushyMoveDirection dir)
        {
            return false;
        }


        public PushySquareDto ToDto()
        {
            var newDto = new PushySquareDto();
            newDto.UserId = this.UserId;
            return newDto;
        }

        internal override PushySquare Copy()
        {
            return new PushyFigure() { ChildSquares = CopyChildren(), UserId = UserId };
        }
    }
}
