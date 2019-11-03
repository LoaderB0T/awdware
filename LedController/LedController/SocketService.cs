using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebApi.Dtos.Led;

namespace LedController
{
    class SocketService
    {
        private HubConnection _connection;
        public SocketService()
        {
            _connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5555/LedHub")
                .Build();

            _connection.Closed += async (error) =>
            {
                await Task.Delay(new Random().Next(0, 5) * 1000);
                await _connection.StartAsync();
                await _connection.SendAsync("StartListening", "user:201911020202236614");
                Console.Error.WriteLine(error);
            };

            _connection.On<LedConfigurationDto>("ReceiveEffect", (effect) =>
            {
                ReceivedEffectHandler(effect);
            });
            Init().ConfigureAwait(false);
        }

        private void ReceivedEffectHandler(LedConfigurationDto effect)
        {
            Console.WriteLine(effect.Name);
        }

        public async Task Init()
        {
            await _connection.StartAsync();
            await _connection.SendAsync("StartListening", "user:201911020202236614");
        }
    }
}
