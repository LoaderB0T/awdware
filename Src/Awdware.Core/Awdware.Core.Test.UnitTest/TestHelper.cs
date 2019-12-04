using Awdware.Core.Business.Facade.Controllers;
using Awdware.Core.Business.Implementation.Services;
using Awdware.Core.Data.Implementation.Contexts;
using Awdware.Core.Data.Implementation.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.IO;

namespace UnitTest
{
    public class TestHelper
    {
        private readonly TestContext _testContext;

        private Mock<IWebHostEnvironment> _environment;
        private IConfiguration _configuration;
        private AwdwareCoreDbContext _awdwareCoreDbContext;
        private UserRepository _userRepo;

        private AuthenticationController _authenticationController;

        private MailService _mailService;
        private UserService _userService;
        private JwtService _jwtService;
        private AuthenticationService _authenticationService;

        public TestData TestData { get; }

        public TestHelper(TestContext testContext)
        {
            _testContext = testContext;
            TestData = new TestData();
        }

        public AuthenticationController GetAuthenticationController()
        {
            if (_authenticationController == null)
            {
                var authenticationService = GetAuthenticationService();
                var userService = GetUserService();
                _authenticationController = new AuthenticationController(authenticationService, userService);
            }
            return _authenticationController;
        }

        public AwdwareCoreDbContext GetDbContext()
        {
            if (_awdwareCoreDbContext == null)
            {
                string tmn = _testContext.FullyQualifiedTestClassName;
                var options = new DbContextOptionsBuilder<AwdwareCoreDbContext>()
                       .UseInMemoryDatabase(tmn)
                       .Options;
                _awdwareCoreDbContext = new AwdwareCoreDbContext(options);
            }

            return _awdwareCoreDbContext;
        }

        public IUserRepository GetUserRepository()
        {
            if (_userRepo == null)
            {
                var context = GetDbContext();
                _userRepo = new UserRepository(context);
            }
            return _userRepo;
        }

        public IUserService GetUserService()
        {
            if (_userService == null)
            {
                var userRepo = GetUserRepository();
                _userService = new UserService(userRepo);
            }

            return _userService;
        }

        public IJwtService GetJwtService()
        {
            if (_jwtService == null)
            {
                _jwtService = new JwtService(GetEnvironment().ContentRootPath, "", "");
            }
            return _jwtService;
        }

        public IAuthenticationService GetAuthenticationService()
        {
            if (_authenticationService == null)
            {
                var userRepository = GetUserRepository();
                var jwtService = GetJwtService();
                var configuration = GetConfiguration();
                var mailService = new Mock<IMailService>().Object;//GetMailService();

                _authenticationService = new AuthenticationService(
                    userRepository,
                    jwtService,
                    configuration,
                    mailService);
            }
            return _authenticationService;
        }

        public IMailService GetMailService()
        {
            if (_mailService == null)
            {
                _mailService = new MailService(GetConfiguration());
            }
            return _mailService;
        }

        public IConfiguration GetConfiguration()
        {
            if (_configuration == null)
            {
                IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
                //configurationBuilder.SetBasePath(Directory.GetCurrentDirectory() + "../../../..");
                configurationBuilder.AddJsonFile("appsettings.json");
                _configuration = configurationBuilder.Build();
            }
            return _configuration;
        }

        public IWebHostEnvironment GetEnvironment()
        {
            if(_environment == null)
            {
                _environment = new Mock<IWebHostEnvironment>();
            }
            return _environment.Object;
        }
    }
}
