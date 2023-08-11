using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MOPUN.Data;
using MOPUN.Models;
using MOPUN.Services;
#nullable disable

namespace MOPUN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MOPUNDB _context;
        private readonly TokenService _tokenService;

        /// <summary>
        /// Constructor instantiates Database context and token service
        /// </summary>
        /// <param name="context"></param>
        /// <param name="tokenService"></param>
        public LoginController(MOPUNDB context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }


        [AllowAnonymous]
        [HttpGet("all")]
        public String AllAccess()
        {
            return "Public Content";
        }

        [Authorize]
        [HttpGet("user")]
        public String UserAccess()
        {
            return "User Content";
        }

        [Authorize(Roles = "Moderator")]
        [HttpGet("mod")]
        public String ModeratorAccess()
        {
            return "Moderator Board";
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public String AdminAccess()
        {
            return "Admin Board";
        }

        /// <summary>
        /// Login method accepts User info as a parameter from front-end
        /// checks validity generates a jwt token
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns>JWT token</returns>
        [AllowAnonymous]
        [HttpPost("SignIn")]
   
        public IActionResult Login([FromBody] AccountLogin userLogin)
        {
            var jwtResponse = Authenticate(userLogin);
            if (jwtResponse != null)
            {
                return Ok(jwtResponse);
            }

            return NotFound("user not found");
        }

        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userLogin"></param>
        /// <returns></returns>
        private JwtResponse Authenticate(AccountLogin userLogin)
        {
            // Condition to deal with null checks
            if (userLogin == null || string.IsNullOrWhiteSpace(userLogin.Username) || string.IsNullOrWhiteSpace(userLogin.Password))
            {
                return null;
            }

            // Collation is changed only for password for case sensitive check : Latin1_General_CS_AS
            var currentUser = _context.Accounts.FirstOrDefault(x =>
                x.Username == userLogin.Username && x.Password == userLogin.Password);

            if (currentUser != null)
            {
                // Generate JWT token
                var token = _tokenService.GenerateJwtToken(currentUser);

                // Create an instance of JwtResponse and populate it
                var jwtResponse = new JwtResponse
                {   
                    Id = currentUser.ID,
                    Username = currentUser.Username,
                    Roles = new List<string> { currentUser.Privilege },
                    Token = token
                };

                return jwtResponse;
            }

            return null;
        }



    }
}
