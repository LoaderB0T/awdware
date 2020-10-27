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

        public IEnumerable<BlogPostDto> GetLatestBlogPosts(int skipCount = 0)
        {
            return this._blogRepository.GetLatestBlogPosts().Select(x => x.ToDto());
        }
    }
}
