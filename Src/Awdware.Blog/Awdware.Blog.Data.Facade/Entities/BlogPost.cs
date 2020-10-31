using System;
using System.ComponentModel.DataAnnotations;

namespace Awdware.Blog.Data.Facade.Entities
{
    public class BlogPost
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        [MinLength(2), MaxLength(64)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public string Preview { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        public string[] KeyWords { get; set; }
    }
}
