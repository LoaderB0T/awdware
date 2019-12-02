﻿using Awdware.Business.Implementation.Services;
using Awdware.Facade.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Awdware.Business.Facade.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("RegisteredUser")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthenticationService _authenticationService;

        public UserController(IUserService userService, IAuthenticationService authenticationService)
        {
            _userService = userService;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [Route("getMyUserInfo")]
        public ActionResult<UserDetailsDto> GetMyUserInfo([FromHeader] string authorization)
        {
            var userId = _authenticationService.GetUserIdFromToken(authorization);
            return Ok(_userService.GetMyUserDetails(userId));
        }
    }
}
