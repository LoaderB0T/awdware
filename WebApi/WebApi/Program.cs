using Microsoft.AspNetCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Services;
using WebApi.Repositories;
using WebApi.Contexts;
using Microsoft.EntityFrameworkCore;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .ConfigureLogging((hostingContext, logging) =>
                {
                    logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                    logging.ClearProviders();
                    logging.AddConsole();
                    logging.AddEventLog();
                })
                .ConfigureServices((hostingContext, services) =>
                {
                    var connectionString = hostingContext.Configuration.GetConnectionString("awdwareDB");
                    services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionString));

                    //Add Repositories
                    services.AddScoped<IUserRepository, UserRepository>();

                    //Add Services
                    services.AddScoped<IUserService, UserService>();
                    services.AddScoped<IJwtService, JwtService>();
                    services.AddScoped<IMailService, MailService>();
                    services.AddScoped<IAuthenticationService, AuthenticationService>();
                })
                .UseStartup<Startup>();
        }
    }
}
