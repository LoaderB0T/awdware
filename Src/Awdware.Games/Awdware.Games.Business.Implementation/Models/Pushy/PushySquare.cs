using Awdware.Games.Facade.Dtos.Pushy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public abstract class PushySquare
    {
        public List<PushyFigure> Figures { get; private set; }
        protected List<PushySquare> ChildSquares { get; private set; }
        public abstract bool CanBeMovedToField(PushyField field, PushySquare square, PushyMoveDirection dir);
        public abstract bool CanStepOnField(PushyField field, PushyFigure figure, PushyMoveDirection dir);
        public abstract bool CollidesWithFigure(PushyField field, PushyFigure figure);
        public abstract void StepOnField(PushyField pushyField, PushyFigure figure, PushyMoveDirection dir);
        public virtual PushySquareDto ToDto()
        {
            var dto = new PushySquareDto();
            dto.ChildSquares = this.ChildSquares.Select(c => c.ToDto());
            dto.Figures = this.Figures.Select(f => f.ToDto());
            return dto;
        }

        public PushySquare()
        {
            Figures = new List<PushyFigure>();
            ChildSquares = new List<PushySquare>();
        }

        internal bool HasFigure(PushyFigure fig)
        {
            return HasFigure(fig.UserId);
        }

        internal bool HasFigure(string userId)
        {
            return this.Figures.Any(x => x.UserId.Equals(userId, StringComparison.InvariantCultureIgnoreCase));
        }

        internal List<PushySquare> GetCollidingChilds(PushyField field, PushyFigure fig)
        {
            return this.ChildSquares.Where(x => x.CollidesWithFigure(field, fig)).ToList();
        }

        internal PushyFigure GetFigure(string userId)
        {
            return this.Figures.FirstOrDefault(x => x.UserId.Equals(userId, StringComparison.InvariantCultureIgnoreCase));
        }

        internal void RemoveFigure(PushyFigure figure)
        {
            this.Figures.RemoveAll(x => x.UserId.Equals(figure.UserId, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
