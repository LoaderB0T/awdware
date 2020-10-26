using Awdware.Blog.Data.Facade.Entities;
using Awdware.Blog.Facade.Dtos;
using System.Text.Json;

namespace Awdware.Blog.Data.Facade
{
    public static class EntityExtensions
    {
        public static BlogPostDto ToDto(this BlogPost blogPost)
        {
            return new BlogPostDto()
            {
                Id = blogPost.Id.ToString(),
                Title = blogPost.Title,
                Content = blogPost.Content,
                DateTime = blogPost.DateTime
            };
        }
    }
}
