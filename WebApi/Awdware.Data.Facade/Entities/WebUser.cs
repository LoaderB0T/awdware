using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Awdware.Data.Facade.Entities
{
    public class WebUser
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string UserId { get; set; }

        [Required]
        [MinLength(2), MaxLength(30)]
        public string Firstname { get; set; }

        [Required]
        [MinLength(2), MaxLength(30)]
        public string Lastname { get; set; }

        [Required]
        [MinLength(3), MaxLength(20)]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public bool ConfirmedMail { get; set; }
    }
}
