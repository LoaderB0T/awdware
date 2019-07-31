using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities.Enums;

namespace WebApi.Entities
{
    public class Confirmationkey
    {
        [Required]
        [ForeignKey("WebUser")]
        public string UserId { get; set; }

        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string KeyString { get; set; }

        [Required]
        public ConfirmType ConfirmType { get; set; }

        public DateTime? Expiration { get; set; }
    }
}
