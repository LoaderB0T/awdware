using System;
using System.Collections.Generic;
using Awdware.Blog.Data.Facade.Entities;

namespace Awdware.Blog.Data.Implementation.Repositories
{
    public interface IBlogRepository
    {
        IEnumerable<BlogPost> GetLatestBlogPosts(int skipCount);
        BlogPost GetBlogPostDetailsById(Guid id);
    }
}
