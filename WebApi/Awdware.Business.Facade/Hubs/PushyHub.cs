using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Awdware.Business.Implementation.Models;
using Awdware.Facade.Dtos.Games;
using Awdware.Business.Implementation.Services;
using Awdware.Facade.Dtos;

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

        public GameLobbyInformationDto CreateLobby(string userId, string lobbyName, string password = null)
        {
            var newLobby = new GameLobby(lobbyName, userId, Context.ConnectionId, GameType.PUSHY, 2, password);
            _gameScope.AddLobby(newLobby);
            var userInfo = _userService.GetUserInfo(userId);
            return new GameLobbyInformationDto()
            {
                Id = newLobby.Id.ToString(),
                Name = newLobby.Name,
                Users = new UserInfoDto[] { userInfo }
            };
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
                    Id = lobby.Id.ToString(),
                    Name = lobby.Name,
                    Users = users
                };
            });
        }

        public bool JoinLobby(string lobbyId, string userId, string password)
        {
            var lobby = _gameScope.GetJoinableLobbies(GameType.PUSHY).FirstOrDefault(x => x.Id.Equals(Guid.Parse(lobbyId)));
            if (lobby == null)
                return false;

            bool success = lobby.TryJoin(userId, Context.ConnectionId, password);
            if (!success)
                return false;

            var userInfo = _userService.GetUserInfo(userId);

            var conIds = lobby.GetConnectionIds().ToList().AsReadOnly();
            Clients.Clients(conIds).SendAsync("PlayerJoined", userInfo);
            return true;
        }
    }
}
