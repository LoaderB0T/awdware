using Awdware.Blog.Facade.Dtos;
using System.Collections.Generic;

namespace Awdware.Core.Business.Implementation.Services
{
    public interface IBlogService
    {
        IEnumerable<BlogPostDto> GetLatestBlogPosts(int skipCount, string locale);
        BlogPostDetailsDto GetBlogPostDetails(string id, string locale);
    }
}
