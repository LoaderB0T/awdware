using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models
{
    public class GameScope<GameClass>
    {
        private List<GameLobby<GameClass>> _lobbies = new List<GameLobby<GameClass>>();

        public void AddLobby(GameLobby<GameClass> lobby)
        {
            _lobbies.Add(lobby);
        }

        public IEnumerable<GameLobby<GameClass>> GetJoinableLobbies(GameType type)
        {
            return _lobbies.Where(lobby => lobby.GameType == type && lobby.IsJoinable);
        }

        public IEnumerable<GameLobby<GameClass>> GetLobbiesForUser(GameType type, string userId)
        {
            return _lobbies.Where(lobby => lobby.GameType == type && lobby.GetUserIds().Any(x => x.Equals(userId, StringComparison.InvariantCultureIgnoreCase)));
        }

        private IEnumerable<GameLobby<GameClass>> GetLobbiesForConnectionId(string conId)
        {
            return _lobbies.Where(lobby => lobby.IsConnectionIdPresent(conId));
        }

        public IEnumerable<GameLobby<GameClass>> UserDisconnected(string connectionId)
        {
            var affectedLobbies = GetLobbiesForConnectionId(connectionId);
            affectedLobbies.ToList().ForEach(lobby =>
            {
                lobby.PlayerDisconnected(connectionId);
                if (lobby.ActivePlayerCount == 0)
                {
                    _lobbies.Remove(lobby);
                }
            });
            return affectedLobbies;
        }
    }
}
