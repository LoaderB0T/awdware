using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Blog.Facade.Dtos
{
    public class BlogPostDetailsDto
    {
        public BlogPostType PostType { get; set; }
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Locale { get; set; }
        public IEnumerable<BlogPostTranslationDto> Translations { get; set; }
        public DateTime DateTime { get; set; }
    }
}
