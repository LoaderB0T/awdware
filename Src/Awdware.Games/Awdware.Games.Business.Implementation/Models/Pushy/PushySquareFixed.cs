using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public abstract class PushySquareFixed : PushySquare
    {
        public override bool CanBeMovedToField(PushyField field, PushySquare square)
        {
            return false;
        }
    }
}
