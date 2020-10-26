using System;
using System.Collections.Generic;
using System.Text;

namespace Awdware.Blog.Facade.Dtos
{
    public class BlogPostDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime DateTime { get; set; }
    }
}
