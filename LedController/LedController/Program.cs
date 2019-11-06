using System;
using System.IO;
using System.Text.Json;
using WebApi.Dtos.Led;
using WebApi.Helper;

namespace LedController
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            if (!File.Exists("./config.led"))
            {
                Console.Error.WriteLine("Config file not found");
                return;
            }

            var configEncrypted = File.ReadAllText("./config.led");
            var configLessEncrypted = StringUtils.Caesar(configEncrypted, -42);
            var configJson = StringUtils.Decode(configLessEncrypted);
            LedConfigFileDto config;
            try
            {
                config = JsonSerializer.Deserialize<LedConfigFileDto>(configJson);
            }
            catch (JsonException)
            {
                Console.Error.WriteLine("Invalid Config File!");
                return;
            }

            var socket = new SocketService(config.ServerHost, config.ServerPort, config.ServerUseHttps, config.UserId);
            var mgr = new EffectManager();
            socket.OnEffectSelected += ((sender, args) =>
            {
                var effect = LedEffectBuilder.GetEffect(args, mgr.LedCount);
                mgr.StartEffect(effect);
            });
            Console.ReadLine();
            mgr.Dispose();
        }
    }
}
