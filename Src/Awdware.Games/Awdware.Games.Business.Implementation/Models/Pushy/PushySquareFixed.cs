using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public abstract class PushySquareFixed : PushySquare
    {
        public override bool Move(PushyField field, PushyMoveDirection dir)
        {
            return false;
        }

        public override bool Entered(PushyField field, PushySquare square, PushyMoveDirection dir)
        {
            if (this.ChildSquares?.Count > 0)
            {
                var oldSquares = new List<PushySquare>(this.ChildSquares);
                var failed = oldSquares.Any(s => !s.Entered(field, square, dir));
                if (failed)
                    return false;
            }

            this.ChildSquares.Add(square);
            return true;
        }
    }
}
