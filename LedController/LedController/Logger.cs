using Microsoft.Extensions.Logging;

namespace LedController
{
    public static class Logger
    {
        private static readonly ILogger _logger = Init();
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
        public static void LogError(string msg, object args = null)
        {
            _logger.LogError(msg, args);
        }
    }
}
