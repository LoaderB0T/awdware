using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.IO;
using WebApi.Contexts;
using WebApi.Controllers;
using WebApi.Repositories;
using WebApi.Services;

namespace UnitTest
{
    public class TestHelper
    {
        private readonly TestContext _testContext;

        private Mock<IWebHostEnvironment> _environment;
        private Mock<ILogger> _logger;
        private IConfiguration _configuration;
        private ApplicationDbContext _webShopDbContext;
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
                _authenticationController = new AuthenticationController(authenticationService, userService, new NullLogger<AuthenticationController>());
            }
            return _authenticationController;
        }

        public ApplicationDbContext GetDbContext()
        {
            if (_webShopDbContext == null)
            {
                string tmn = _testContext.FullyQualifiedTestClassName;
                var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                       .UseInMemoryDatabase(tmn)
                       .Options;
                _webShopDbContext = new ApplicationDbContext(options);
            }

            return _webShopDbContext;
        }

        public IUserRepository GetUserRepository()
        {
            if (_userRepo == null)
            {
                var context = GetDbContext();
                _userRepo = new UserRepository(context, new NullLogger<UserRepository>());
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
                _jwtService = new JwtService(GetConfiguration(), GetEnvironment());
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
                    mailService,
                    new NullLogger<AuthenticationService>());
            }
            return _authenticationService;
        }

        public IMailService GetMailService()
        {
            if (_mailService == null)
            {
                _mailService = new MailService(GetConfiguration(), GetLogger());
            }
            return _mailService;
        }

        public IConfiguration GetConfiguration()
        {
            if (_configuration == null)
            {
                IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
                configurationBuilder.SetBasePath(Directory.GetCurrentDirectory() + "../../../..");
                configurationBuilder.AddJsonFile("appsettings.json");
                _configuration = configurationBuilder.Build();
            }
            return _configuration;
        }

        public ILogger GetLogger()
        {
            if(_logger == null)
            {
                _logger = new Mock<ILogger>();
            }
            return _logger.Object;
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
