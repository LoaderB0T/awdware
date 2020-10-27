using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Awdware.Core.Business.Implementation.Services;
using Awdware.Blog.Facade.Dtos;
using System.Collections.Generic;

namespace Awdware.Blog.Business.Facade.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("RegisteredUser")]
    public class BlogController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IBlogService _blogService;

        public BlogController(IAuthenticationService authenticationService, IBlogService blogService)
        {
            _authenticationService = authenticationService;
            _blogService = blogService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("posts/{skipCount}")]
        public ActionResult<IEnumerable<BlogPostDto>> GetLatestBlogPosts(int skipCount = 0)
        {
            var posts = _blogService.GetLatestBlogPosts(skipCount);
            return Ok(posts);
        }
    }
}
