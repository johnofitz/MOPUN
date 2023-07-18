
using Microsoft.AspNetCore.Mvc;
using MOPUN.Data;
using MOPUN.Models;

namespace MOPUN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MOPUNDB _context;

        public LoginController(MOPUNDB context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login( Accounts accounts)
        {
            // Check if the username and password are valid
            var user = _context.Accounts.FirstOrDefault(u =>
                u.Username == accounts.Username && u.Password == accounts.Password);

            if (user == null)
            {
                return Unauthorized(); // Return 401 Unauthorized if the credentials are invalid
            }
            // Generate a token or session ID for the authenticated user
            var token = GenerateToken(user.ID);

            // Return the token or session ID to the client
            return Ok(new { Token = token });
        }

        [HttpPost]
        [Route("Logout")]
        public IActionResult Logout()
        {
            return Ok();
        }

        private string GenerateToken(int userId)
        {
            return "token";
        }
    }

}