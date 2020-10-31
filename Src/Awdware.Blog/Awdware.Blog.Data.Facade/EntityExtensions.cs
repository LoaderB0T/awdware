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
                PostType = BlogPostType.Preview,
                Id = blogPost.Id.ToString(),
                Title = blogPost.Title,
                Preview = blogPost.Preview,
                DateTime = blogPost.DateTime
            };
        }

        public static BlogPostDetailsDto ToDetailsDto(this BlogPost blogPost)
        {
            return new BlogPostDetailsDto()
            {
                PostType = BlogPostType.Details,
                Id = blogPost.Id.ToString(),
                Title = blogPost.Title,
                Content = blogPost.Content,
                DateTime = blogPost.DateTime
            };
        }
    }
}
