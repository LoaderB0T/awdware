using System;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using WebApi.Contexts;
using WebApi.Hubs;
using WebApi.Repositories;
using WebApi.Services;

namespace WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment Environment { get; }

        public Startup(
            IConfiguration configuration,
            IWebHostEnvironment env
            )
        {
            Configuration = configuration;
            Environment = env;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureCors(services);

            services.AddControllers();
            services.AddSignalR();

            var connectionString = Configuration.GetConnectionString("awdwareDB");
            services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionString));

            //Add Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ILedRepository, LedRepository>();

            //Add Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ILedService, LedService>();

            var serviceProvider = services.BuildServiceProvider();
            var logger = serviceProvider.GetService<ILogger<Startup>>();
            services.AddSingleton(typeof(ILogger), logger);

            ConfigureJwtAuthentication(services);

        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            UpdateDatabase(app);

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("SiteCorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<LedConfigHub>("ledConfigHub");
            });
        }

        private void ConfigureJwtAuthentication(IServiceCollection services)
        {
            var userTokenKeyPath = Configuration.GetSection("Certificates").GetValue<string>("JwtUserSignature");
            var contentRoot = Environment.ContentRootPath;
            var path = contentRoot + "\\" + userTokenKeyPath;
            var userToken = System.IO.File.ReadAllText(path);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
               .AddJwtBearer("UserToken", options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       LifetimeValidator = (before, expires, token, param) =>
                       {
                           return expires > DateTime.UtcNow;
                       },
                       ValidateAudience = false,
                       ValidateIssuer = false,
                       ValidateIssuerSigningKey = true,
                       ValidateActor = false,
                       ValidateLifetime = true,
                       //ValidIssuer = "VoteDB",
                       //ValidAudience = "Vote User",
                       IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(userToken))
                   };
               });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RegisteredUser", new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .AddAuthenticationSchemes("UserToken")
                    .Build());
                options.AddPolicy("ConfirmedUser", new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .RequireAssertion(context =>
                    {
                        var userId = context.User.Claims.ToList()[0].Value;

                        var scopeFactory = services
                            .BuildServiceProvider()
                            .GetRequiredService<IServiceScopeFactory>();

                        using var scope = scopeFactory.CreateScope();
                        var provider = scope.ServiceProvider;
                        var authService = provider.GetRequiredService<IAuthenticationService>();
                        return authService.HasMailConfirmed(userId);
                    })
                        .AddAuthenticationSchemes("UserToken")
                        .Build());
                options.AddPolicy(JwtBearerDefaults.AuthenticationScheme, policy =>
                {
                    policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                    policy.RequireAuthenticatedUser();
                });
            });
        }

        private void ConfigureCors(IServiceCollection services)
        {
            var corsBuilder = new CorsPolicyBuilder();

            if (Environment.IsDevelopment())
            {
                corsBuilder.AllowAnyHeader();
                corsBuilder.AllowAnyMethod();
                corsBuilder.WithOrigins("http://localhost:4200");
                corsBuilder.AllowCredentials();

            }
            else
            {
                corsBuilder.AllowAnyHeader();
                corsBuilder.AllowAnyMethod();
                corsBuilder.WithOrigins("https://two.awdware.de");
                corsBuilder.AllowCredentials();
            }

            services.AddCors(options =>
            {
                options.AddPolicy("SiteCorsPolicy", corsBuilder.Build());
            });
        }

        private static void UpdateDatabase(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
            context.Database.Migrate();
        }
    }
}
