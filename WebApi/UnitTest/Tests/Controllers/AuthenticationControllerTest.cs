using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WebApi.Contexts;
using WebApi.Controllers;
using Microsoft.EntityFrameworkCore;
using WebApi.Repositories;
using WebApi.Services;
using WebApi;
using System.Net;
using WebApi.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace UnitTest.Tests.Controllers
{
    [TestClass]
    public class AuthenticationControllerTest
    {
        private static TestHelper _testHelper;
        private AuthenticationController _authenticationController;

        [ClassInitialize]
        public static void BeforeAll(TestContext testContext)
        {
            _testHelper = new TestHelper(testContext);
        }

        [TestInitialize]
        public void BeforeEach()
        {
            _authenticationController = _testHelper.GetAuthenticationController();
        }

        [TestMethod]
        public void TestUserController()
        {
            var loginRequestDto = new LoginRequestDto
            {
                Username = "user1",
                Password = "pw123"
            };
            var res = _authenticationController.Login(loginRequestDto);
            Assert.AreEqual(((res.Result as OkObjectResult).Value as LoginResponseDto).LoginSuccess, LoginResult.WRONG_USERNAME);
        }
    }
}
