﻿using Microsoft.AspNetCore.Authorization;
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
        [Route("posts/{skipCount}/{locale}")]
        public ActionResult<IEnumerable<BlogPostDto>> GetLatestBlogPosts(int skipCount, string locale)
        {
            var posts = _blogService.GetLatestBlogPosts(skipCount, locale);
            return Ok(posts);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("post/{id}/{locale}")]
        public ActionResult<BlogPostDto> GetBlogPostDetails(string id, string locale)
        {
            var post = _blogService.GetBlogPostDetails(id, locale);
            if(post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
    }
}
