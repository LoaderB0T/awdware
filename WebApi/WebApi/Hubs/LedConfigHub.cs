using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace WebApi.Hubs
{
    public class LedConfigHub: Hub
    {
        public async Task SendMessage(string user, string msg)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, msg);
        }
    }
}
