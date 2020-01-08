using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public abstract class PushySquareBasicMoveable: PushySquareMoveable
    {
        public override bool CanBeMovedToField(PushyField field, PushySquare square, PushyMoveDirection dir)
        {
            throw new NotImplementedException();
        }

        public override bool CanStepOnField(PushyField field, PushyFigure figure, PushyMoveDirection dir)
        {
            throw new NotImplementedException();
        }

        public override bool CollidesWithFigure(PushyField field, PushyFigure figure)
        {
            throw new NotImplementedException();
        }

        public override void StepOnField(PushyField pushyField, PushyFigure figure, PushyMoveDirection dir)
        {
            throw new NotImplementedException();
        }
    }
}
