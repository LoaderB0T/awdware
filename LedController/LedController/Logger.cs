using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace LedController
{
    public static class Logger
    {
        private static ILogger _logger = Init();
        private static ILoggerFactory _loggerFactory;

        private static ILogger Init()
        {
            _loggerFactory = LoggerFactory.Create(builder =>
            {
                builder
                    .AddConsole()
                    .AddEventLog();
            });
            var logger = _loggerFactory.CreateLogger("awdware-LedClient");
            return logger;
        }

        public static void LogError(string msg, object[] args)
        {
            _logger.LogError(msg, args);
        }
        public static void LogError(string msg, object args)
        {
            _logger.LogError(msg, args);
        }
    }
}
