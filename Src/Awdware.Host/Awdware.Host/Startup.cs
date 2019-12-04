using System;
using System.IO;
using System.Linq;
using System.Reflection;
using Awdware.Core.Business.Facade.Controllers;
using Awdware.Core.Business.Facade.Hubs;
using Awdware.Core.Business.Implementation.Services;
using Awdware.Core.Data.Implementation.Contexts;
using Awdware.Core.Data.Implementation.Repositories;
using Awdware.Led.Business.Facade.Controllers;
using Awdware.Led.Business.Facade.Hubs;
using Awdware.Led.Business.Implementation.Services;
using Awdware.Led.Data.Implementation.Contexts;
using Awdware.Led.Data.Implementation.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Awdware.Host
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
            var builder = services.AddMvcCore();
            builder.AddApplicationPart(typeof(AuthenticationController).Assembly);
            builder.AddApplicationPart(typeof(UserController).Assembly);
            builder.AddApplicationPart(typeof(LedController).Assembly);
            builder.AddApplicationPart(typeof(TestController).Assembly);

            var assembly = typeof(UserController).GetTypeInfo().Assembly;
            services.AddMvc()
                .AddApplicationPart(assembly);

            ConfigureCors(services);

            services.AddControllers(builder =>
            {
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.IgnoreNullValues = true;
            });
            services.AddSignalR(options => {
                options.EnableDetailedErrors = true;
            });

            var connectionString = Configuration.GetConnectionString("awdwareDB");
            services.AddDbContext<AwdwareCoreDbContext>(opt => opt.UseSqlServer(connectionString));
            services.AddDbContext<LedDbContext>(opt => opt.UseSqlServer(connectionString));

            //Add Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ILedRepository, LedRepository>();

            //Add Services
            var accessTokenKey = Configuration.GetSection("KeyLocations").GetValue<string>("accessTokenKey");
            var refreshTokenKey = Configuration.GetSection("KeyLocations").GetValue<string>("refreshTokenKey");
            services.AddScoped<IJwtService, JwtService>(s => new JwtService(Environment.ContentRootPath, accessTokenKey, refreshTokenKey));
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ILedService, LedService>();

            ConfigureJwtAuthentication(services);

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.Secure = CookieSecurePolicy.SameAsRequest;
                options.MinimumSameSitePolicy = SameSiteMode.Lax;
                options.CheckConsentNeeded = context => true;
                options.HttpOnly = HttpOnlyPolicy.Always;
            });
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
                endpoints.MapHub<LedConfigHub>("LedHub");
                endpoints.MapHub<PushyHub>("PushyHub");
            });
        }

        private void ConfigureJwtAuthentication(IServiceCollection services)
        {
            var accessTokenKeyPath = Configuration.GetSection("KeyLocations").GetValue<string>("accessTokenKey");
            var contentRoot = Environment.ContentRootPath;
            var path = Path.Join(contentRoot, accessTokenKeyPath);
            var accessToken = File.ReadAllText(path);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
               .AddJwtBearer("AccessToken", options =>
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
                       IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(accessToken))
                   };
               });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RegisteredUser", new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .AddAuthenticationSchemes("AccessToken")
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
                        .AddAuthenticationSchemes("AccessToken")
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
            MigrateDb<AwdwareCoreDbContext>(serviceScope);
            MigrateDb<LedDbContext>(serviceScope);
        }

        private static void MigrateDb<T>(IServiceScope serviceScope) where T : DbContext
        {
            using var context = serviceScope.ServiceProvider.GetService<T>();
            context.Database.Migrate();
        }
    }
}
