using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public abstract class PushySquareMoveable : PushySquare
    {
        public override bool Move(PushyField field, PushyMoveDirection dir)
        {
            var parentSquare = field.GetParent(this);
            var myCoords = field.GetSquareCoords(this);
            var relativePos = myCoords.GetRelativePos(dir, field);
            if (relativePos == null)
                return false;

            var targetSquare = field.Squares[relativePos.X][relativePos.Y];

            parentSquare.ChildSquares.Remove(this);

            var success = targetSquare.Entered(field, this, dir);
            if (!success)
                return false;

            return true;
        }
    }
}
