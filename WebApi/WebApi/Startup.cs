using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using WebApi.Contexts;
using WebApi.Services;

namespace WebApi
{
    public class Startup
    {
        private readonly ILogger _logger;
        private readonly IAuthenticationService _authenticationService;
        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        public Startup(
            IConfiguration configuration,
            IHostingEnvironment env,
            ILogger<Startup> logger,
            IAuthenticationService authenticationService)
        {
            Configuration = configuration;
            Environment = env;
            _logger = logger;
            _authenticationService = authenticationService;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureJwtAuthentication(services);
            ConfigureCors(services);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSignalR();
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

            app.UseCors("SiteCorsPolicy");
            app.UseAuthentication();
            app.UseHttpsRedirection();

            app.UseSignalR(routes =>
            {
                //routes.MapHub<HardwareDataHub>("/hardwaredata");
            });

            app.UseMvc();
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
                        return _authenticationService.HasMailConfirmed(userId);
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
                _logger.LogInformation("In Development environment");
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
            using (var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>())
                {
                    context.Database.Migrate();
                }
            }
        }
    }
}
