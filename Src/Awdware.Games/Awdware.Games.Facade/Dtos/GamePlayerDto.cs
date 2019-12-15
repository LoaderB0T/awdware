using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Games.Facade.Dtos
{
    public class GamePlayerDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool LobbyOwner { get; set; }
    }
}
