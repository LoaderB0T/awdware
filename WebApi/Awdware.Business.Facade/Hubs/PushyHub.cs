using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Awdware.Business.Implementation.Models;
using Awdware.Facade.Dtos.Games;
using Awdware.Business.Implementation.Services;

namespace Awdware.Business.Facade.Hubs
{
    public class PushyHub : Hub
    {
        private static GameScope _gameScope = new GameScope();
        private IUserService _userService;

        public PushyHub(IUserService userService)
        {
            this._userService = userService;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _gameScope.UserDisconnected(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public void CreateLobby(string userId)
        {
            var newLobby = new GameLobby("awd", userId, Context.ConnectionId, GameType.PUSHY, 2);
            _gameScope.AddLobby(newLobby);
        }

        public IEnumerable<GameLobbyInformationDto> GetGameLobbies()
        {
            var lobbies = _gameScope.GetJoinableLobbies(GameType.PUSHY);
            return lobbies.Select(lobby =>
            {
                var userIds = lobby.GetUserIds();
                var users = userIds.Select(x => _userService.GetUserInfo(x));
                return new GameLobbyInformationDto()
                {
                    LobbyName = lobby.Name,
                    Users = users
                };
            });
        }
    }
}
