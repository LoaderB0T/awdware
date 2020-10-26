using Awdware.Core.Business.Implementation.Services;
using Awdware.Blog.Business.Implementation.Models;
using Awdware.Blog.Facade.Dtos;


namespace Awdware.Blog.Facade.Utils
{
    public static class BlogPostExtensions
    {
        public static BlogPostDto ToDto(this BlogPost gameLobby, IUserService userService)
        {
            return new BlogPostDto()
            {
                Id = gameLobby.Id.ToString(),
                Title = gameLobby.Title,
                Content = gameLobby.Content,
                DateTime = gameLobby.DateTime
            };
        }
    }
}
