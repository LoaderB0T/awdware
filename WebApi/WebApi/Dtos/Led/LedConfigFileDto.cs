using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.Led
{
    public class LedConfigFileDto
    {
        public string ServerHost { get; set; }
        public int ServerPort { get; set; }
        public bool ServerUseHttps { get; set; }
        public string UserId { get; set; }
        public string ConfigName { get; set; }
        public int LedCount { get; set; }
    }
}
