using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models
{
    public class GameLobby
    {
        private readonly List<GameConnection> _connections = new List<GameConnection>();

        public Guid Id { get; set; }
        public string Name { get; private set; }
        public GameType GameType { get; private set; }
        public bool IsGameRunning { get; private set; }
        public int MaxPlayerCount { get; private set; }
        public string Password { get; private set; }

        public int PlayerCount { get => _connections.Count; }
        public bool IsJoinable { get => !IsGameRunning && PlayerCount < MaxPlayerCount; }

        public GameLobby(string name, string userId, string conId, GameType type, int maxPlayerCount, string password = null)
        {
            Id = Guid.NewGuid();
            Name = name;
            GameType = type;
            IsGameRunning = false;
            MaxPlayerCount = maxPlayerCount;
            Password = password;
            var gameConnection = new GameConnection(userId, conId, true);
            _connections.Add(gameConnection);
        }

        internal bool IsConnectionIdPresent(string conId)
        {
            return _connections.FindByConnectionId(conId) != null;
        }

        public IEnumerable<string> GetUserIds()
        {
            return _connections.Select(x => x.UserId);
        }

        internal void RemovePlayerByConnectionId(string connectionId)
        {
            var connection = _connections.FindByConnectionId(connectionId);
            if (connection == null)
                return;
            _connections.Remove(connection);
            if (connection.IsOwner && PlayerCount > 0)
            {
                _connections.First().MakeOwner();
            }
        }

        public bool TryJoin(string userId, string connectionId, string password = null)
        {
            if (Password != null && !Password.Equals(password, StringComparison.InvariantCulture))
            {
                return false;
            }
            var con = new GameConnection(userId, connectionId);
            _connections.Add(con);
            return true;
        }

        public IEnumerable<string> GetConnectionIds()
        {
            return _connections.Select(x => x.ConenctionId);
        }
    }
}
