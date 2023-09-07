using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using MOPUN.Models;
using System.Text;
#nullable disable

namespace MOPUN.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;

        /// <summary>
        /// TokenService constructor instantiates IConfiguration manager,
        /// allowing access to appsettings.json configuration file.
        /// </summary>
        /// <param name="config">The IConfiguration instance.</param>
        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        /// <summary>
        /// Generates a JSON Web Token (JWT) for the specified user.
        /// </summary>
        /// <param name="user">The user for whom to generate the token.</param>
        /// <returns>The generated JWT as a string.</returns>
        public string GenerateJwtToken(Accounts user)
        {
            // Create a new symmetric security key using the secret key from appsettings.json
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            // Create signing credentials using the security key and HMACSHA256 algorithm
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Define the claims for the JWT, including the user's name identifier and role
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Role, user.Privilege)
            };

            // Create a new JWT with the specified issuer, audience, claims, expiration time, and signing credentials
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(GetTokenExpirationMinutes()),
                signingCredentials: signingCredentials
            );

            // Convert the JWT to a string and return it
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>
        /// Gets the token expiration time in minutes.
        /// </summary>
        /// <returns>The token expiration time in minutes.</returns>
        private double GetTokenExpirationMinutes()
        {
            // You can modify this method to read the token expiration time from the configuration or other logic.
            return 15;
        }
    }
}
