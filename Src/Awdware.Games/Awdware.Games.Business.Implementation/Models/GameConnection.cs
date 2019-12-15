using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Games.Business.Implementation.Models
{
    public class GameConnection
    {
        public string UserId { get; private set; }
        public string ConnectionId { get; private set; }
        public bool IsOwner { get; internal set; }
        public bool Disconnected { get; internal set; }

        public GameConnection(string userId, string connectionId, bool isOwner = false)
        {
            UserId = userId;
            ConnectionId = connectionId;
            IsOwner = isOwner;
        }

        internal void UserHasNewConnectionId(string connectionId)
        {
            this.ConnectionId = connectionId;
        }

    }

    public static class GameConnectionExtentions
    {
        public static GameConnection FindByUserId(this List<GameConnection> connections, string userId)
        {
            return connections.FirstOrDefault(con => con.UserId.Equals(userId, StringComparison.InvariantCultureIgnoreCase));
        }

        public static GameConnection FindByConnectionId(this List<GameConnection> connections, string connectionId)
        {
            return connections.FirstOrDefault(con => con.ConnectionId.Equals(connectionId, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
