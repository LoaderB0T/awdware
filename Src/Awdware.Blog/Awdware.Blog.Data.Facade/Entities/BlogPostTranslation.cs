using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Awdware.Blog.Data.Facade.Entities
{
    public class BlogPostTranslation
    {
        [ForeignKey("BlogPost")]
        [Required]
        public Guid PostId { get; set; }

        [Required]
        public string Locale { get; set; }

        [Required]
        public string ContentKey { get; set; }

        [Required]
        public string Value { get; set; }

    }
}
