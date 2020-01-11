using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Awdware.Games.Facade.Dtos.Pushy;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushySquareHouse : PushySquareFixed
    {
        public PushyColor Color { get; set; }
        public override bool CollidesWithFigure(PushyField field, PushyFigure figure)
        {
            return false;
        }

        public override PushySquareDto ToDto()
        {
            var dto = base.ToDto();
            dto.SquareType = PushySquareTypeDto.House;
            dto.Color = Color;
            return dto;
        }

        public override bool Entered(PushyField field, PushySquare square, PushyMoveDirection dir)
        {
            //Todo: Check if won

            return true;
        }

        internal override PushySquare Copy()
        {
            return new PushySquareHouse()
            {
                ChildSquares = CopyChildren(),
                Color = Color
            };
        }
    }
}
