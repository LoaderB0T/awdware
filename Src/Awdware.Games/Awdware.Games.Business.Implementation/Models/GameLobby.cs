using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models
{
    public class GameLobby<GameClass>
    {
        private readonly List<GameConnection> _connections = new List<GameConnection>();
        private GameClass _gameClass;

        public Guid Id { get; set; }
        public string Name { get; private set; }
        public GameType GameType { get; private set; }
        public bool IsGameRunning { get; set; }
        public int MaxPlayerCount { get; private set; }
        public string Password { get; private set; }
        public GameClass GameData { get => this._gameClass; }

        public int PlayerCount { get => _connections.Count; }
        public bool IsJoinable { get => !IsGameRunning && PlayerCount < MaxPlayerCount; }
        public int ActivePlayerCount { get => this._connections.Count(x => x.Disconnected == false); }

        public bool IsOwner(string userId)
        {
            var  connection = _connections.FindByUserId(userId);
            if (connection == null)
                return false;

            return connection.IsOwner;
        }

        public GameLobby(GameClass gameClass, string name, string userId, string conId, GameType type, int maxPlayerCount, string password = null)
        {
            this._gameClass = gameClass;
            Id = Guid.NewGuid();
            Name = name;
            GameType = type;
            IsGameRunning = false;
            MaxPlayerCount = maxPlayerCount;
            Password = password;
            var gameConnection = new GameConnection(userId, conId, true);
            _connections.Add(gameConnection);
        }

        internal bool PlayerDisconnected(string connectionId)
        {
            var connection = _connections.FindByConnectionId(connectionId);
            if (connection == null)
                return true;

            connection.Disconnected = true;

            if (connection.IsOwner && ActivePlayerCount > 0)
            {
                var newOwner = _connections.FirstOrDefault(x => x.Disconnected == false);
                if(newOwner == null)
                {
                    return false;
                }
                connection.IsOwner = false;
                newOwner.IsOwner = true;
            }
            return true;
        }

        internal bool IsConnectionIdPresent(string conId)
        {
            return _connections.FindByConnectionId(conId) != null;
        }

        public IEnumerable<string> GetUserIds()
        {
            return _connections.Select(x => x.UserId);
        }

        public IEnumerable<string> GetActiveUserIds()
        {
            return _connections.Where(x => x.Disconnected == false).Select(x => x.UserId);
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
            return _connections.Select(x => x.ConnectionId);
        }

        public bool RefreshConnectionId(string userId, string connectionId)
        {
            var conn = this._connections.FirstOrDefault(x => x.UserId.Equals(userId, StringComparison.InvariantCultureIgnoreCase));
            if (conn == null)
                return false;
            conn.Disconnected = false;
            conn.UserHasNewConnectionId(connectionId);
            return true;
        }
    }
}
