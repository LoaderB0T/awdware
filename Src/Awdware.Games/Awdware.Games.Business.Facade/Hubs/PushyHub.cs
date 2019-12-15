using Awdware.Core.Business.Implementation.Services;
using Awdware.Core.Facade.Dtos;
using Awdware.Games.Business.Implementation.Models;
using Awdware.Games.Facade.Dtos;
using Awdware.Games.Facade.Utils;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Awdware.Games.Business.Facade.Hubs
{
    public class PushyHub : Hub
    {
        private static GameScope _gameScope = new GameScope();
        private IUserService _userService;

        public PushyHub(IUserService userService)
        {
            _userService = userService;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var lobbies = _gameScope.UserDisconnected(Context.ConnectionId);

            foreach (var lobby in lobbies)
            {
                var allUserInLobby = lobby.ToDto(this._userService);

                var conIds = lobby.GetConnectionIds().ToList().AsReadOnly();
                Clients.Clients(conIds).SendAsync("PlayersChanged", allUserInLobby.Players);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public GameLobbyInformationDto CreateLobby(string userId, string lobbyName, string password = null)
        {
            var newLobby = new GameLobby(lobbyName, userId, Context.ConnectionId, GameType.PUSHY, 2, password);
            _gameScope.AddLobby(newLobby);
            return newLobby.ToDto(this._userService);
        }

        public IEnumerable<GameLobbyInformationDto> GetGameLobbies()
        {
            var lobbies = _gameScope.GetJoinableLobbies(GameType.PUSHY);
            return lobbies.Select(lobby => lobby.ToDto(this._userService));
        }

        public IEnumerable<GamePlayerDto> JoinLobby(string lobbyId, string userId, string password)
        {
            var lobby = _gameScope.GetJoinableLobbies(GameType.PUSHY).FirstOrDefault(x => x.Id.Equals(Guid.Parse(lobbyId)));
            if (lobby == null)
                return null;

            bool success = lobby.TryJoin(userId, Context.ConnectionId, password);
            if (!success)
                return null;

            var lobbyDto = lobby.ToDto(this._userService);

            var conIds = lobby.GetConnectionIds().ToList().AsReadOnly();
            Clients.Clients(conIds).SendAsync("PlayersChanged", lobbyDto.Players);

            return lobbyDto.Players;
        }

        public GameLobbyInformationDto GetLobbyInfo(string lobbyId, string userId)
        {
            var lobby = _gameScope.GetLobbiesForUser(GameType.PUSHY, userId).FirstOrDefault(x => x.Id.Equals(Guid.Parse(lobbyId)));
            if (lobby == null)
                return null;

            return lobby.ToDto(this._userService);
        }

        public GameLobbyInformationDto ReJoinLobby(string lobbyId, string userId)
        {
            var lobby = _gameScope.GetLobbiesForUser(GameType.PUSHY, userId).FirstOrDefault(x => x.Id.Equals(Guid.Parse(lobbyId)));
            if (lobby == null)
                return null;

            lobby.RefreshConnectionId(userId, Context.ConnectionId);

            var conIds = lobby.GetConnectionIds().ToList().AsReadOnly();
            Clients.Clients(conIds).SendAsync("PlayersChanged", lobby.ToDto(this._userService).Players);

            return lobby.ToDto(this._userService);
        }
    }
}
