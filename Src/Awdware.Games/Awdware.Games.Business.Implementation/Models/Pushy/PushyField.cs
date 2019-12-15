using Awdware.Games.Facade.Dtos.Pushy;
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

        public List<PushySquare> FlatSquares { get => Squares.SelectMany(s => s).ToList(); }

        public PushyFieldDto ToDto()
        {
            var newDto = new PushyFieldDto();
            newDto.Squares = Squares
                .Select(row => row
                    .Select(square => square.ToDto())
                );
            return newDto;
        }

        public static Tuple<int, int> GetNewCoords(int x, int y, PushyMoveDirection dir)
        {
            switch (dir)
            {
                case PushyMoveDirection.Up:
                    return Tuple.Create(x, y - 1);
                case PushyMoveDirection.Right:
                    return Tuple.Create(x + 1, y);
                case PushyMoveDirection.Down:
                    return Tuple.Create(x, y + 1);
                case PushyMoveDirection.Left:
                    return Tuple.Create(x - 1, y);
                default:
                    throw new InvalidOperationException("unknown move direction");
            }
        }

        internal Tuple<int, int> GetSquareCoords(PushySquare pushySquare)
        {
            for (int x = 0; x < Width; x++)
            {
                for (int y = 0; y < Height; y++)
                {
                    if (this.Squares[x][y] == pushySquare)
                    {
                        return Tuple.Create(x, y);
                    }
                }
            }
            return null;
        }

        public bool CanMove(PushyFigure fig, int x, int y, PushyMoveDirection dir)
        {
            var from = Squares[x][y];
            var newCoords = GetNewCoords(x, y, dir);
            var to = Squares[newCoords.Item1][newCoords.Item2];

            if (!from.HasFigure(fig))
                return false;

            var allowed = to.CanStepOnField(this, fig, dir);
            if (!allowed)
                return false;

            return true;
        }

        public PushyFigure GetFigure(string userId)
        {
            var fig = FlatSquares.FirstOrDefault(x => x.HasFigure(userId));
            if (fig == null)
                return null;
            return fig.GetFigure(userId);
        }

        public PushyFigureData GetFigureData(string userId)
        {
            var square = FlatSquares.FirstOrDefault(x => x.HasFigure(userId));
            if (square == null)
                return null;
            var squarePos = GetSquareCoords(square);

            return new PushyFigureData()
            {
                Figure = square.GetFigure(userId),
                X = squarePos.Item1,
                Y = squarePos.Item2
            };
        }

        public void DoMove(PushyFigure figure, int x, int y, PushyMoveDirection dir)
        {
            var from = Squares[x][y];
            var newCoords = GetNewCoords(x, y, dir);
            var to = Squares[newCoords.Item1][newCoords.Item2];

            if (!from.HasFigure(figure))
                throw new InvalidOperationException("Figure not found");

            from.RemoveFigure(figure);

            to.StepOnField(this, figure, dir);
        }
    }
}
