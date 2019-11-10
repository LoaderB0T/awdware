using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos.Led
{
    public class LedSettingsDto
    {
        public string UserId { get; set; }
        public string SettingName { get; set; }
        public string ComPortName { get; set; }
        public string Id { get; set; }
    }
}
