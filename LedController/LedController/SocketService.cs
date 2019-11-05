using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using WebApi.Dtos.Led;

namespace LedController
{
    class SocketService
    {
        private bool useHttps = false;
        private string serverDomain = "localhost";
        private int serverPort = 5555;
        private string userId = "user:201911020202236614";
        private HubConnection _connection;
        public event EventHandler<LedConfigurationDto> OnEffectSelected;
        public SocketService()
        {
            var connectionTypeString = useHttps ? "https" : "http";
            _connection = new HubConnectionBuilder()
                .WithUrl($"{connectionTypeString}://{serverDomain}:{serverPort}/LedHub")
                .Build();

            _connection.Closed += async (error) =>
            {
                Console.Error.WriteLine(error);
                Console.WriteLine("\nLost connection. Trying to reconnect");
                await Connect(true);
            };

            _connection.On<LedConfigurationDto>("ReceiveEffect", (effect) =>
            {
                ReceivedEffectHandler(effect);
            });
            Connect().ConfigureAwait(false);
        }

        private async Task Connect(bool reconnectAfterError = false)
        {
            bool addDelay = reconnectAfterError;
            while (true)
            {
                if (addDelay)
                {
                    await Task.Delay(new Random().Next(0, 5) * 1000);
                }
                if (PingHost(serverDomain, serverPort))
                {
                    await _connection.StartAsync();
                    if (addDelay)
                    {
                        await Task.Delay(4000);
                    }
                    Console.WriteLine(reconnectAfterError ? "Reconnected" : "Connection established");
                    break;
                }
                else
                {
                    addDelay = true;
                }
            }

            await _connection.SendAsync("StartListening", userId);
            Console.WriteLine("Started Listening");
        }

        private void ReceivedEffectHandler(LedConfigurationDto effect)
        {
            OnEffectSelected?.Invoke(this, effect);
        }

        public static bool PingHost(string hostUri, int portNumber)
        {
            try
            {
                using (var client = new TcpClient(hostUri, portNumber))
                    return true;
            }
            catch (SocketException)
            {
                return false;
            }
        }

    }
}
