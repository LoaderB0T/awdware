using Awdware.Blog.Data.Facade.Entities;
using Awdware.Blog.Facade.Dtos;
using System;
using System.Linq;
using System.Text.Json;

namespace Awdware.Blog.Data.Facade
{
    public static class EntityExtensions
    {
        public static BlogPostDto ToDto(this BlogPost blogPost, string locale)
        {
            return new BlogPostDto()
            {
                PostType = BlogPostType.Preview,
                Id = blogPost.Id.ToString(),
                Title = blogPost.Title,
                Preview = blogPost.Preview,
                DateTime = blogPost.DateTime,
                Translations = blogPost.Translations.Where(x => x.Locale.Equals(locale, StringComparison.InvariantCultureIgnoreCase)).Select(x => x.ToDto())
            };
        }

        public static BlogPostDetailsDto ToDetailsDto(this BlogPost blogPost, string locale)
        {
            return new BlogPostDetailsDto()
            {
                PostType = BlogPostType.Details,
                Id = blogPost.Id.ToString(),
                Title = blogPost.Title,
                Content = blogPost.Content,
                DateTime = blogPost.DateTime,
                Translations = blogPost.Translations.Where(x => x.Locale.Equals(locale, StringComparison.InvariantCultureIgnoreCase)).Select(x => x.ToDto())
            };
        }

        public static BlogPostTranslationDto ToDto(this BlogPostTranslation blogPostTranslation)
        {
            return new BlogPostTranslationDto()
            {
                Key = blogPostTranslation.ContentKey,
                Value = blogPostTranslation.Value
            };
        }
    }
}
