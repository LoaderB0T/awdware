using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace WebApi.Services
{
    public class JwtService : IJwtService
    {
        public IConfiguration Configuration { get; }
        private readonly string _userTokenKeyPath;

        public JwtService(IConfiguration configuration, IWebHostEnvironment evn)
        {
            Configuration = configuration;
            var userTokenKeyPath = Configuration.GetSection("Certificates").GetValue<string>("JwtUserSignature");
            var contentRoot = evn.ContentRootPath;
            var path = contentRoot + "\\" + userTokenKeyPath;
            _userTokenKeyPath = path;
        }

        /// <summary>
        /// Creates a new JWT for a specific userId that lasts 30 days.
        /// </summary>
        /// <param name="userId">The UserID.</param>
        /// <returns>Tokenstring</returns>
        public string CreateToken(string userId)
        {
            string secretKeyB64 = System.IO.File.ReadAllText(_userTokenKeyPath);
            var secretKey = new SymmetricSecurityKey(Convert.FromBase64String(secretKeyB64));
            var claims = new Claim[] {
            new Claim("userId", userId),
            };

            var token = new JwtSecurityToken(
                issuer: "awdware",
                audience: "awdware user",
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature)
            );

            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }

        public bool IsValidUserToken(string token)
        {
            var validationParameters = new TokenValidationParameters
            {
                LifetimeValidator = (before, expires, jwtToken, param) =>
                {
                    return expires > DateTime.UtcNow;
                },
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                ValidateActor = false,
                ValidateLifetime = true,
                //ValidIssuer = "awdware",
                //ValidAudience = "awdware user",
                IssuerSigningKey = new SymmetricSecurityKey(
                           Convert.FromBase64String(System.IO.File.ReadAllText(@_userTokenKeyPath)))
            };
            SecurityToken validatedToken;
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            var user = handler.ValidateToken(token, validationParameters, out validatedToken);
            var claims = user.Claims.ToList();
            if (claims.Count() != 5)
                return false;
            return true;
        }
    }
}
