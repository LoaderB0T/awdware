using System;
using System.Collections.Generic;
using System.Linq;
using Awdware.Blog.Data.Facade;
using Awdware.Blog.Data.Implementation.Repositories;
using Awdware.Blog.Facade.Dtos;

namespace Awdware.Core.Business.Implementation.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;

        public BlogService(
            IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        public IEnumerable<BlogPostDto> GetLatestBlogPosts(int skipCount, string locale)
        {
            return this._blogRepository.GetLatestBlogPosts(skipCount).Select(x => x.ToDto(locale));
        }

        public BlogPostDetailsDto GetBlogPostDetails(string id, string locale)
        {
            var guid = Guid.Parse(id);
            return this._blogRepository.GetBlogPostDetailsById(guid).ToDetailsDto(locale);
        }
    }
}
