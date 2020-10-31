using Awdware.Blog.Facade.Dtos;
using System.Linq;
using System.Collections.Generic;
using Awdware.Blog.Data.Facade.Entities;
using Awdware.Blog.Data.Implementation.Contexts;
using System;

namespace Awdware.Blog.Data.Implementation.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly BlogDbContext _dbContext;

        public BlogRepository(BlogDbContext ledDbContext)
        {
            _dbContext = ledDbContext;
        }

        public IEnumerable<BlogPost> GetLatestBlogPosts(int skipCount)
        {
            return _dbContext.BlogPosts.OrderBy(x => x.DateTime).Skip(skipCount).Take(10);
        }

        public BlogPost GetBlogPostDetailsById(Guid id)
        {
            return _dbContext.BlogPosts.FirstOrDefault(x => x.Id.Equals(id));
        }
    }
}
