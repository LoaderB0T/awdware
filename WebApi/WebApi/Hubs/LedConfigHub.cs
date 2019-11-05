using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Hubs
{
    public class LedConfigHub : Hub
    {
        public static readonly LedConfigScope _scope = new LedConfigScope();

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _scope.RemoveUserByConnection(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public void StartListening(string userId)
        {
            _scope.AddUser(Context.ConnectionId, userId);
        }
    }

    public class LedConfigScope
    {
        private readonly Dictionary<string, string> userConnectionMap;

        public LedConfigScope()
        {
            userConnectionMap = new Dictionary<string, string>();
        }

        public void AddUser(string connectionId, string userId)
        {
            userConnectionMap.Add(userId, connectionId);
        }

        public string GetConnectionId(string userId)
        {
            userConnectionMap.TryGetValue(userId, out var conId);
            return conId;
        }

        public void RemoveUserByConnection(string conId)
        {
            var keyToDelete = userConnectionMap.FirstOrDefault(x => x.Value.Equals(conId));
            if (keyToDelete.Key != null)
            {
                userConnectionMap.Remove(keyToDelete.Key);
            }
        }
    }
}
