using System;
using System.Collections.Generic;
using System.Text;
using Awdware.Games.Facade.Dtos.Pushy;

namespace Awdware.Games.Business.Implementation.Models.Pushy
{
    public class PushyFigure
    {
        public string UserId { get; set; }

        public PushyFigureDto ToDto()
        {
            var newDto = new PushyFigureDto();
            newDto.UserId = this.UserId;
            return newDto;
        }
    }
}
