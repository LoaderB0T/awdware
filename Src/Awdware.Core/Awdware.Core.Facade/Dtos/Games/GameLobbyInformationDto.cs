using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Core.Facade.Dtos.Games
{
    public class GameLobbyInformationDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<UserInfoDto> Users { get; set; }
    }
}
