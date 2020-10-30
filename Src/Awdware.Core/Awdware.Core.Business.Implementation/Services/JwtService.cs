using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;

namespace Awdware.Core.Business.Implementation.Services
{
    public class JwtService : IJwtService
    {
        private readonly string _accessTokenKeyPath;
        private readonly string _refreshTokenKeyPath;

        public JwtService(string contentRootPath, string accessTokenKeyPath, string refreshTokenKeyPath)
        {
            _accessTokenKeyPath = Path.Join(contentRootPath, accessTokenKeyPath);
            _refreshTokenKeyPath = Path.Join(contentRootPath, refreshTokenKeyPath);
        }

        /// <summary>
        /// Creates a new access JWT for a specific userId that lasts 30 Minutes.
        /// </summary>
        /// <returns>The generated Token String</returns>
        public string CreateToken(string userId)
        {
            string secretKeyB64 = File.ReadAllText(_accessTokenKeyPath);
            var secretKey = new SymmetricSecurityKey(Convert.FromBase64String(secretKeyB64));
            var claims = new Claim[] {
                new Claim("userId", userId),
            };

            var token = new JwtSecurityToken(
                issuer: "awdware",
                audience: "awdware user",
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature)
            );

            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }

        public bool IsValidAccessToken(string token, bool validateLifeTime = true)
        {
            return IsValidToken(token, _accessTokenKeyPath, validateLifeTime);
        }

        /// <summary>
        /// Creates a new refresh JWT for a specific userId that lasts 180 Days.
        /// </summary>
        /// <returns>The generated Token String</returns>
        public string CreateRefreshToken(string userId)
        {
            string secretKeyB64 = File.ReadAllText(_refreshTokenKeyPath);
            var secretKey = new SymmetricSecurityKey(Convert.FromBase64String(secretKeyB64));
            var claims = new Claim[] {
                new Claim("userId", userId),
            };

            var token = new JwtSecurityToken(
                issuer: "awdware",
                audience: "awdware user",
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(180),
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256Signature)
            );

            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }

        public bool IsValidRefreshToken(string token)
        {
            return IsValidToken(token, _refreshTokenKeyPath);
        }

        private bool IsValidToken(string token, string keyPath, bool validateLifeTime = true)
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
                ValidateLifetime = validateLifeTime,
                //ValidIssuer = "awdware",
                //ValidAudience = "awdware user",
                IssuerSigningKey = new SymmetricSecurityKey(
                           Convert.FromBase64String(File.ReadAllText(keyPath)))
            };
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            var parsedToken = handler.ReadJwtToken(token);

            try
            {
                var user = handler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
