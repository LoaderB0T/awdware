using System;
using System.Collections.Generic;
using Awdware.Blog.Data.Facade.Entities;
using Awdware.Blog.Facade.Dtos;

namespace Awdware.Blog.Data.Implementation.Repositories
{
    public interface IBlogRepository
    {
        IEnumerable<BlogPost> GetLatestBlogPosts(int skipCount = 0);
    }
}
