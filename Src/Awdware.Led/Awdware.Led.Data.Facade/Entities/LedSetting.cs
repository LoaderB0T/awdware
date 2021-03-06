using System;
using System.ComponentModel.DataAnnotations;

namespace Awdware.Led.Data.Facade.Entities
{
    public class LedSetting
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public string ComPortName { get; set; }

        [Required]
        public string SettingName { get; set; }
    }
}
