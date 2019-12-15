using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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

            var myCoords = field.GetmyCoords(this);
            var movedCoords = PushyField.GetNewCoords(myCoords.Item1, myCoords.Item2, dir);
            var next = field.Squares[movedCoords.Item1][movedCoords.Item2];

            var blocked = colliders.Any(x => !x.CanBeMovedToField(field, next));

            return !blocked;
        }

        public override bool CollidesWithFigure(PushyField field, PushyFigure figure)
        {
            return false;
        }
    }
}
