using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models
{
    public class GameScope
    {
        private List<GameLobby> _lobbies = new List<GameLobby>();

        public void AddLobby(GameLobby lobby)
        {
            _lobbies.Add(lobby);
        }

        public IEnumerable<GameLobby> GetJoinableLobbies(GameType type)
        {
            return _lobbies.Where(lobby => lobby.GameType == type && lobby.IsJoinable);
        }

        public IEnumerable<GameLobby> GetLobbiesForUser(GameType type, string userId)
        {
            return _lobbies.Where(lobby => lobby.GameType == type && lobby.GetUserIds().Any(x => x.Equals(userId, StringComparison.InvariantCultureIgnoreCase)));
        }

        private IEnumerable<GameLobby> GetLobbiesForConnectionId(string conId)
        {
            return _lobbies.Where(lobby => lobby.IsConnectionIdPresent(conId));
        }

        public IEnumerable<GameLobby> UserDisconnected(string connectionId)
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
