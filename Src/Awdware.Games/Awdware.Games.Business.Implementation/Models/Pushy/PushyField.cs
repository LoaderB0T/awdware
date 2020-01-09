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

        internal PushySquare GetParent(PushySquare pushySquare)
        {
            for (int x = 0; x < Width; x++)
            {
                for (int y = 0; y < Height; y++)
                {
                    var parent = TryFindParentInSquare(this.Squares[x][y], pushySquare);
                    if (parent != null)
                    {
                        return parent;
                    }
                }
            }
            return null;
        }

        private PushySquare TryFindParentInSquare(PushySquare searchLocation, PushySquare toBeFound)
        {
            if (searchLocation == toBeFound)
                return null;
            if (searchLocation.ChildSquares.Any(x => x == toBeFound) || searchLocation.Figures.Any(x => x == toBeFound))
            {
                return searchLocation;
            }
            return searchLocation.ChildSquares.FirstOrDefault(x => TryFindParentInSquare(x, toBeFound) != null);
        }

        public static PushyPosition GetNewCoords(int x, int y, PushyMoveDirection dir)
        {
            switch (dir)
            {
                case PushyMoveDirection.Up:
                    return new PushyPosition(x, y - 1);
                case PushyMoveDirection.Right:
                    return new PushyPosition(x + 1, y);
                case PushyMoveDirection.Down:
                    return new PushyPosition(x, y + 1);
                case PushyMoveDirection.Left:
                    return new PushyPosition(x - 1, y);
                default:
                    throw new InvalidOperationException("unknown move direction");
            }
        }

        internal PushyPosition GetSquareCoords(PushySquare pushySquare)
        {
            for (int x = 0; x < Width; x++)
            {
                for (int y = 0; y < Height; y++)
                {
                    if (CheckIfSquareIsPresent(this.Squares[x][y], pushySquare))
                    {
                        return new PushyPosition(x, y);
                    }
                }
            }
            return null;
        }

        private bool CheckIfSquareIsPresent(PushySquare searchLocation, PushySquare toBeFound)
        {
            if (searchLocation == toBeFound)
                return true;
            return searchLocation.ChildSquares.Any(x => CheckIfSquareIsPresent(x, toBeFound))
                || searchLocation.Figures.Any(x => CheckIfSquareIsPresent(x, toBeFound));
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
                X = squarePos.X,
                Y = squarePos.Y
            };
        }

        public bool TryMove(PushyFigure figure, int x, int y, PushyMoveDirection dir)
        {
            var from = Squares[x][y];

            if (!from.HasFigure(figure))
                throw new InvalidOperationException("Figure not found");

            return figure.Move(this, dir);
        }

        public PushyField Copy()
        {
            return new PushyField()
            {
                Squares = Squares.Select(row => row.Select(square => square.Copy()).ToList()).ToList()
            };
        }
    }
}
