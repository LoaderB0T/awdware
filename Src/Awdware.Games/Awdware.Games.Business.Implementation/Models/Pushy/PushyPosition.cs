using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushyPosition
    {
        public int X { get; set; }
        public int Y { get; set; }

        public PushyPosition(int x, int y)
        {
            X = x;
            Y = y;
        }

        public PushyPosition GetRelativePos(PushyMoveDirection dir, PushyField field)
        {
            switch (dir)
            {
                case PushyMoveDirection.Up:
                    if (X == 0)
                        return null;
                    return new PushyPosition(X - 1, Y);
                case PushyMoveDirection.Right:
                    if (X == field.Width - 1)
                        return null;
                    return new PushyPosition(X + 1, Y);
                case PushyMoveDirection.Down:
                    if (Y == field.Height - 1)
                        return null;
                    return new PushyPosition(X, Y + 1);
                case PushyMoveDirection.Left:
                    if (Y == 0)
                        return null;
                    return new PushyPosition(X, Y - 1);
                case PushyMoveDirection.Unknown:
                default:
                    return null;
            }
        }
    }
}
