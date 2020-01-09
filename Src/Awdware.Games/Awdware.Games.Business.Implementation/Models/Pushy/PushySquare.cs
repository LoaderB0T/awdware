using Awdware.Games.Facade.Dtos.Pushy;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public abstract class PushySquare
    {
        public List<PushySquare> ChildSquares { get; protected set; }
        public abstract bool Entered(PushyField field, PushySquare square, PushyMoveDirection dir);
        public abstract bool Move(PushyField field, PushyMoveDirection dir);
        public abstract bool CollidesWithFigure(PushyField field, PushyFigure figure);


        public ReadOnlyCollection<PushyFigure> Figures
        {
            get
            {
                return this.ChildSquares.Where(x => x is PushyFigure).Select(x => x as PushyFigure).ToList().AsReadOnly();
            }
        }


        public virtual PushySquareDto ToDto()
        {
            var dto = new PushySquareDto();
            dto.ChildSquares = this.ChildSquares.Select(c => c.ToDto());
            return dto;
        }

        public PushySquare()
        {
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

        internal abstract PushySquare Copy();

        internal List<PushySquare> CopyChildren()
        {
            return this.ChildSquares.Select(x => x.Copy()).ToList();
        }
    }
}
