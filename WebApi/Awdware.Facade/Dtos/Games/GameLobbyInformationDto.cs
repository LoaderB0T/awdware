using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Facade.Dtos.Games
{
    public class GameLobbyInformationDto
    {
        public string LobbyName { get; set; }
        public IEnumerable<UserInfoDto> Users { get; set; }
    }
}
