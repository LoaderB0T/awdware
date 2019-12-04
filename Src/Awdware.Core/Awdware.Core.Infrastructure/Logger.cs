using Microsoft.Extensions.Logging;
using System;

namespace Awdware.Core.Infrastructure.Helper
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
            var logger = _loggerFactory.CreateLogger("awdware-api");
            return logger;
        }

        public static void LogError(string msg, params object[] args)
        {
            _logger.LogError(msg, args);
        }

        public static void LogError(Exception ex, string msg, params object[] args)
        {
            _logger.LogError(ex, msg, args);
        }

        public static void LogInformation(string msg, params object[] args)
        {
            _logger.LogInformation(msg, args);
        }
    }
}
