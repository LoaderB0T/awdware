using System;
using System.Collections.Generic;
using System.Text;

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
    }
}
