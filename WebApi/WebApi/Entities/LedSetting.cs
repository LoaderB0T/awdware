using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Entities
{
    public class LedSetting
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public int LedCount { get; set; }

        [Required]
        public string SettingName { get; set; }
    }
}
