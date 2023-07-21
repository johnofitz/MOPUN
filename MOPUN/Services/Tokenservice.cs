using Microsoft.IdentityModel.Tokens;
using MOPUN.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
#nullable disable

namespace MOPUN.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string GenerateJwtToken(Accounts user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Role, user.Privilege)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(GetTokenExpirationMinutes()),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private double GetTokenExpirationMinutes()
        {
            // You can modify this to read token expiration time from config or other logic.
            // For now, we'll use 15 minutes as an example.
            return 15;
        }
    }
}
