using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public abstract class PushySquareFixed : PushySquare
    {
        public override bool CanBeMovedToField(PushyField field, PushySquare square, PushyMoveDirection dir)
        {
            return false;
        }

        public override void StepOnField(PushyField field, PushyFigure figure, PushyMoveDirection dir)
        {
            if(this.ChildSquares?.Count > 0)
            {
                this.ChildSquares.ForEach(s => s.StepOnField(field, figure, dir));
            }
            this.Figures.Add(figure);
        }
    }
}
