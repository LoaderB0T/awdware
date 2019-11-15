using Awdware.Facade.Dtos.Led;
using Awdware.Infrastructure.Helper;
using System;
using System.IO;
using System.Text;
using System.Text.Json;

namespace LedController
{
    class Program
    {
        private static EffectManager mgr;

        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            if (!File.Exists("./config.led"))
            {
                Logger.LogError("Config file not found!");
                return;
            }

            var configEncrypted = File.ReadAllText("./config.led");
            var configLessEncrypted = StringUtils.Caesar(configEncrypted, -42);
            var configJson = StringUtils.Decode(configLessEncrypted);
            LedConfigFileDto config;
            try
            {
                config = JsonSerializer.Deserialize<LedConfigFileDto>(configJson);
                Console.WriteLine($"Using config {config.ConfigName}!");
            }
            catch (JsonException)
            {
                Logger.LogError("Invalid Config File!");
                return;
            }

            var socket = new SocketService(config.ServerHost, config.ServerPort, config.ServerUseHttps, config.UserId);

            var arduino = new ArduinoSerial(config.ComPortName);
            arduino.Initialized += (sender, ledCount) =>
            {
                StartEffectManagement(socket, ledCount, arduino);
            };
            Console.ReadLine();

            arduino.Dispose();
            mgr.Dispose();
        }

        private static void StartEffectManagement(SocketService socket, int ledCount, ArduinoSerial arduino)
        {
            mgr = new EffectManager(ledCount, arduino);
            socket.OnEffectSelected += ((sender, effectDto) =>
            {
                var effect = LedEffectBuilder.GetEffect(effectDto, mgr.LedCount);
                mgr.StartEffect(effect);

                var json = JsonSerializer.Serialize(effectDto);
                var cacheBase42 = StringUtils.Encode(json);
                var cacheEncrypted = StringUtils.Caesar(cacheBase42, 42);
                File.WriteAllText("./cache.led", cacheEncrypted, Encoding.UTF8);
            });

            if (File.Exists("./cache.led"))
            {
                var cacheEncrypted = File.ReadAllText("./cache.led");
                var cacheLessEncrypted = StringUtils.Caesar(cacheEncrypted, -42);
                var cacheJson = StringUtils.Decode(cacheLessEncrypted);
                LedConfigurationDto cache = null;
                try
                {
                    cache = JsonSerializer.Deserialize<LedConfigurationDto>(cacheJson);
                }
                catch (JsonException)
                {
                    Console.Error.WriteLine("Invalid Cache File!");
                }
                if (cache != null)
                {
                    Console.WriteLine("Starting Cached Effect: " + cache.Name);
                    var effect = LedEffectBuilder.GetEffect(cache, mgr.LedCount);
                    mgr.StartEffect(effect);
                }
            }
        }
    }
}
