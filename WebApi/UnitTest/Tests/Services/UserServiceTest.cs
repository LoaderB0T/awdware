using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Reflection;
using WebApi.Dtos;
using WebApi.Services;

namespace UnitTest.Tests
{
    [TestClass]
    public class UserServiceTest
    {
        private static TestHelper _testHelper;
        private IUserService _userService;

        [ClassInitialize]
        public static void BeforeAll(TestContext testContext)
        {
            _testHelper = new TestHelper(testContext);
        }

        [TestInitialize]
        public void BeforeEach()
        {
            _userService = _testHelper.GetUserService();
        }

        [TestMethod]
        public void UserServiceTest_RegisterRequestValid()
        {
            var registerRequestDto = _testHelper.TestData.BasicRegisterRequestDto;
            var isValid = _userService.RegisterRequestValid(registerRequestDto);
            Assert.AreEqual(RegisterResult.SUCCESS, isValid, "This Request should be detected as valid");
        }

        [TestMethod]
        public void UserServiceTest_RegisterRequestMissingInformation()
        {
            var registerRequestDto = _testHelper.TestData.BasicRegisterRequestDto;

            PropertyInfo[] properties = typeof(RegisterRequestDto).GetProperties();
            dynamic oldValue;
            foreach (PropertyInfo property in properties)
            {
                var isValid = _userService.RegisterRequestValid(registerRequestDto);
                Assert.AreEqual(isValid, RegisterResult.SUCCESS, "This Request should be detected as valid");

                oldValue = property.GetValue(registerRequestDto);
                property.SetValue(registerRequestDto, null);

                var isInvalid = _userService.RegisterRequestValid(registerRequestDto);
                Assert.AreEqual(RegisterResult.MISSING_INFORMATION, isInvalid, "This Request should be detected as missing information!");

                property.SetValue(registerRequestDto, oldValue);
            }
        }

        [TestMethod]
        public void UserServiceTest_RegisterRequestPasswordMismatch()
        {
            var registerRequestDto = _testHelper.TestData.BasicRegisterRequestDto;
            registerRequestDto.Password2 = "thisIsMyPW!2";

            var isValid = _userService.RegisterRequestValid(registerRequestDto);
            Assert.AreEqual(RegisterResult.PASSWORDS_NOT_MATCHING, isValid, "This Request should be detected as valid");
        }
    }
}
