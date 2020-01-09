using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushyGame
    {
        public PushyField Field { get; set; }

        public PushyGame(string userId)
        {
            Field = new PushyField();
            Field.Squares = new List<List<PushySquare>>();
            for (int i = 0; i < 10; i++)
            {
                Field.Squares.Add(new List<PushySquare>());
                for (int j = 0; j < 10; j++)
                {
                    if (j == 0 || i == 0 || j == 9 || i == 9)
                    {
                        Field.Squares[i].Add(new PushySquareWall());
                    }
                    else
                    {
                        Field.Squares[i].Add(new PushySquareAir());
                    }
                }
            }
            var fig = new PushyFigure();
            fig.UserId = userId;
            Field.Squares[5][5].Figures.Add(fig);
            Field.Squares[5][7].ChildSquares.Add(new PushySquareBox());
            Field.Squares[6][7].ChildSquares.Add(new PushySquareBox());
        }

        public override string ToString()
        {
            var a = "";
            Field.Squares.ForEach(row =>
            {
                row.ForEach(col =>
                {
                    if (col.Figures.Count > 0)
                    {
                        a += "ö";
                    }
                    else
                    {
                        switch (col.ToDto().SquareType)
                        {
                            case Facade.Dtos.Pushy.PushySquareTypeDto.Unknown:
                                a += "?";
                                break;
                            case Facade.Dtos.Pushy.PushySquareTypeDto.Air:
                                if(col.ChildSquares.Count > 0)
                                {
                                    switch (col.ChildSquares[0].ToDto().SquareType)
                                    {
                                        case Facade.Dtos.Pushy.PushySquareTypeDto.Unknown:
                                            a += "?";
                                            break;
                                        case Facade.Dtos.Pushy.PushySquareTypeDto.Box:
                                            a += "o";
                                            break;
                                        default:
                                            a += "?";
                                            break;
                                    }
                                } else
                                {
                                a += " ";
                                }
                                break;
                            case Facade.Dtos.Pushy.PushySquareTypeDto.Wall:
                                a += "X";
                                break;
                            case Facade.Dtos.Pushy.PushySquareTypeDto.BoxField:
                                a += ".";
                                break;
                            default:
                                a += "?";
                                break;
                        }
                    }
                });
                a += "\n";
            });
            return a;
        }
    }
}
