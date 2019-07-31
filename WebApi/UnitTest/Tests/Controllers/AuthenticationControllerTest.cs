using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.TestHost;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using WebApi;
using WebApi.Controllers;

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

        //[TestMethod]
        //public async System.Threading.Tasks.Task GetNewToken_WithControllerToken_UnauthorizedAsync()
        //{
        //    var server = new TestServer(new WebHostBuilder()
        //         .ConfigureLogging((hostingContext, logging) =>
        //         {
        //             logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
        //             logging.ClearProviders();
        //             logging.AddConsole();
        //             logging.AddEventLog();
        //         })
        //    .ConfigureServices((hostingContext, services) =>
        //    {
        //        var connectionString = hostingContext.Configuration.GetConnectionString("WebShopDB");
        //        services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionString));

        //        //Add Repositories
        //        services.AddScoped<IUserRepository, UserRepository>();
        //        services.AddScoped<IMeasurementRepository, MeasurementRepository>();

        //        //Add Services
        //        services.AddScoped<IUserService, UserService>();
        //        services.AddScoped<IJwtService, JwtService>();
        //        services.AddScoped<IMailService, MailService>();
        //        services.AddScoped<IAuthenticationService, AuthenticationService>();
        //        services.AddScoped<IMeasurementService, MeasurementService>();
        //    })
        //        .UseStartup<Startup>());
        //    var client = server.CreateClient();

        //    var url = "api/authentication/refreshtoken";
        //    var expected = HttpStatusCode.Unauthorized;

        //    // Act
        //    var response = await client.GetAsync(url);

        //    // Assert
        //    Assert.AreEqual(expected, response.StatusCode);

        //    //var result = _authenticationController.GetNewToken("eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMDE5MDIxMjA3MTAyMDgzMjMiLCJzZXJ2ZXJJZCI6IjIwMTkwMjE1MDczNjU2ODQyMCIsIm5iZiI6MTU1MDIxNjIxNywiZXhwIjoxODY1ODM1NDE3LCJpc3MiOiJGSFdFQlNIT1AiLCJhdWQiOiJGSFdFQiBTaG9wIFVzZXIifQ.0XsajCTK2DBXF2L32yw50uTdehrD22utAL71uif1j4I");
        //    //var unauthorizedResult = result as UnauthorizedObjectResult;
        //    //Assert.AreEqual(401, unauthorizedResult.StatusCode);
        //}
    }
}
