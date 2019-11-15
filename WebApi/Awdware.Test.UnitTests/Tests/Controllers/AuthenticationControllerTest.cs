using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.AspNetCore.Mvc;
using Awdware.Facade.Dtos;
using Awdware.Business.Facade.Controllers;

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
            Assert.AreEqual(((res.Result as OkObjectResult).Value as LoginResponseDto).LoginSuccess, LoginResult.WrongUsername);
        }
    }
}
