using Awdware.Facade.Dtos.Led;
using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace LedController
{
    class SocketService
    {
        private readonly bool useHttps;
        private readonly string serverDomain;
        private readonly int serverPort;
        private readonly string userId;
        private readonly HubConnection _connection;
        public event EventHandler<LedConfigurationDto> OnEffectSelected;
        public SocketService(string serverDomain, int serverPort, bool useHttps, string userId)
        {
            this.serverDomain = serverDomain;
            this.serverPort = serverPort;
            this.useHttps = useHttps;
            this.userId = userId;
            var connectionTypeString = this.useHttps ? "https" : "http";
            _connection = new HubConnectionBuilder()
                .WithUrl($"{connectionTypeString}://{this.serverDomain}:{this.serverPort}/LedHub")
                .Build();

            _connection.Closed += async (error) =>
            {
                Console.Error.WriteLine(error);
                Console.WriteLine("\nLost connection. Trying to reconnect");
                await Connect(true).ConfigureAwait(false); ;
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
                    await Task.Delay(new Random().Next(0, 5) * 1000).ConfigureAwait(false);
                }
                if (PingHost(serverDomain, serverPort))
                {
                    await _connection.StartAsync().ConfigureAwait(false); ;
                    if (addDelay)
                    {
                        await Task.Delay(4000).ConfigureAwait(false); ;
                    }
                    Console.WriteLine(reconnectAfterError ? "Reconnected" : "Connection established");
                    break;
                }
                else
                {
                    addDelay = true;
                }
            }

            await _connection.SendAsync("StartListening", userId).ConfigureAwait(false); ;
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
                using var client = new TcpClient(hostUri, portNumber);
                return true;
            }
            catch (SocketException)
            {
                return false;
            }
        }

    }
}
