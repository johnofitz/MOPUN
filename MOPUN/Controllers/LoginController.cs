using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MOPUN.Data;
using MOPUN.Models;
using MOPUN.Services;

namespace MOPUN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MOPUNDB _context;
        private readonly TokenService _tokenService;

        public LoginController(MOPUNDB context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] AccountLogin userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = _tokenService.GenerateJwtToken(user); // Use the TokenService
                return Ok(token);
            }

            return NotFound("user not found");
        }

        // To authenticate user
        private Accounts? Authenticate(AccountLogin userLogin)
        {
            if (userLogin == null || string.IsNullOrWhiteSpace(userLogin.Username) || string.IsNullOrWhiteSpace(userLogin.Password))
            {
                return null;
            }

            var currentUser = _context.Accounts.FirstOrDefault(x =>
                x.Username.ToLower() == userLogin.Username.ToLower() && x.Password == userLogin.Password);

            return currentUser;
        }

    }
}
