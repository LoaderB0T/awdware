using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushyGame
    {
        public PushyField Field { get; set; }

        public PushyGame()
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
            fig.UserId = "user:201911020202236614";
            Field.Squares[5][5].Figures.Add(fig);
        }
    }
}
