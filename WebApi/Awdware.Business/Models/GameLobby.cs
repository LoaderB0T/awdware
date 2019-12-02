﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Awdware.Facade.Dtos;

namespace Awdware.Business.Implementation.Models
{
    public class GameLobby
    {
        private readonly List<GameConnection> _connections = new List<GameConnection>();

        public string Name { get; private set; }
        public GameType GameType { get; private set; }
        public bool IsGameRunning { get; private set; }
        public int MaxPlayerCount { get; private set; }

        public int PlayerCount { get => _connections.Count; }
        public bool IsJoinable { get => !IsGameRunning && PlayerCount < MaxPlayerCount; }

        public GameLobby(string name, string userId, string conId, GameType type, int maxPlayerCount)
        {
            Name = name;
            GameType = type;
            IsGameRunning = false;
            MaxPlayerCount = maxPlayerCount;
            var gameConnection = new GameConnection(userId, conId, true);
            _connections.Add(gameConnection);
        }

        internal bool IsConnectionIdPresent(string conId)
        {
            return _connections.FindByConnectionId(conId) != null;
        }

        public IEnumerable<string> GetUserIds()
        {
            return this._connections.Select(x => x.UserId);
        }

        internal void RemovePlayerByConnectionId(string connectionId)
        {
            var connection = this._connections.FindByConnectionId(connectionId);
            if (connection == null)
                return;
            _connections.Remove(connection);
            if(connection.IsOwner && PlayerCount > 0)
            {
                _connections.First().MakeOwner();
            }
        }
    }
}
