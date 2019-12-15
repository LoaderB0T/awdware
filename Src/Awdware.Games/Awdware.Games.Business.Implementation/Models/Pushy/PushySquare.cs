using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public abstract class PushySquare
    {
        protected List<PushyFigure> Figures { get; private set; }
        protected List<PushySquare> ChildSquares { get; private set; }
        public abstract bool CanBeMovedToField(PushyField field, PushySquare square);
        public abstract bool CanStepOnField(PushyField field, PushyFigure figure, PushyMoveDirection dir);
        public abstract bool CollidesWithFigure(PushyField field, PushyFigure figure);

        public PushySquare()
        {
            Figures = new List<PushyFigure>();
        }

        internal bool HasFigure(PushyFigure fig)
        {
            return this.Figures.Any(x => x.UserId.Equals(fig.UserId, StringComparison.InvariantCultureIgnoreCase));
        }

        internal List<PushySquare> GetCollidingChilds(PushyField field, PushyFigure fig)
        {
            return this.ChildSquares.Where(x => x.CollidesWithFigure(field, fig)).ToList();
        }
    }
}
