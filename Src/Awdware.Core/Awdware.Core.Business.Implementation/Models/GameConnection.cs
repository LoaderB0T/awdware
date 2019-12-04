using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Awdware.Core.Business.Implementation.Models
{
    public class GameConnection
    {
        public string UserId { get; private set; }
        public string ConenctionId { get; private set; }
        public bool IsOwner { get; private set; }

        public GameConnection(string userId, string connectionId, bool isOwner = false)
        {
            UserId = userId;
            ConenctionId = connectionId;
            IsOwner = isOwner;
        }

        internal void MakeOwner()
        {
            IsOwner = true;
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
            return connections.FirstOrDefault(con => con.UserId.Equals(connectionId, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
