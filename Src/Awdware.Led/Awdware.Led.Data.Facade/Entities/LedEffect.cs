﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Awdware.Led.Data.Facade.Entities
{
    public class LedEffect
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        [MinLength(2), MaxLength(64)]
        public string Name { get; set; }

        [Required]
        public string ConfigJson { get; set; }

        [Required]
        public int Version { get; set; }

        [Required]
        public int Ordinal { get; set; }
    }
}
