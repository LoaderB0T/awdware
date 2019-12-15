using Awdware.Core.Business.Implementation.Services;
using Awdware.Games.Business.Implementation.Models;
using Awdware.Games.Facade.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Facade.Utils
{
    public static class GameLobbyExtensions
    {
        public static GameLobbyInformationDto ToDto<GameClass>(this GameLobby<GameClass> gameLobby, IUserService userService)
        {
            var userIds = gameLobby.GetActiveUserIds();
            var players = userIds.Select(userId =>
            {
                var userInfo = userService.GetUserInfo(userId);
                var isOwner = gameLobby.IsOwner(userId);
                return new GamePlayerDto()
                {
                    Id = userInfo.Id,
                    Name = userInfo.Username,
                    LobbyOwner = isOwner
                };
            });

            return new GameLobbyInformationDto()
            {
                Id = gameLobby.Id.ToString(),
                Name = gameLobby.Name,
                Players = players
            };
        }
    }
}
