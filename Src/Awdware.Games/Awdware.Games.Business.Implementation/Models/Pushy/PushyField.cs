using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushyField
    {
        public List<List<PushySquare>> Squares { get; set; }

        public int Width { get => Squares.Count; }
        public int Height { get => Squares.First().Count; }


        public static Tuple<int, int> GetNewCoords(int x, int y, PushyMoveDirection dir)
        {
            switch (dir)
            {
                case PushyMoveDirection.Up:
                    return Tuple.Create(x, y + 1);
                case PushyMoveDirection.Right:
                    return Tuple.Create(x + 1, y);
                case PushyMoveDirection.DOwn:
                    return Tuple.Create(x, y - 1);
                case PushyMoveDirection.Left:
                    return Tuple.Create(x - 1, y);
                default:
                    throw new InvalidOperationException("unknown move direction");
            }
        }

        internal Tuple<int, int> GetmyCoords(PushySquare pushySquare)
        {
            for (int x = 0; x < Width; x++)
            {
                for (int y = 0; y < Height; y++)
                {
                    if(this.Squares[x][y] == pushySquare)
                    {
                        return Tuple.Create(x, y);
                    }
                }
            }
            return null;
        }

        public bool CanMove(PushyField field, PushyFigure fig, int x, int y, PushyMoveDirection dir)
        {
            var from = Squares[x][y];
            var newCoords = GetNewCoords(x, y, dir);
            var to = Squares[newCoords.Item1][newCoords.Item2];

            if (!from.HasFigure(fig))
                return false;

            to.CanStepOnField(field, fig, dir);

            return true;
        }
    }
}
