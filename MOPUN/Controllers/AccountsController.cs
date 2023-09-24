using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOPUN.Data;
using MOPUN.Models;

namespace MOPUN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {

        // Object for Database connection
        private readonly MOPUNDB _context;

        /// <summary>
        /// Constructor instantiates DB object
        /// </summary>
        /// <param name="context"></param>
        public AccountsController(MOPUNDB context)
        {
            _context = context;
        }

        /// <summary>
        /// Method used to return a list of accounts,
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Accounts>>> GetAccounts()
        {
          if (_context.Accounts == null)
          {
              return NotFound();
          }
            return await _context.Accounts.ToListAsync();
        }

        /// <summary>
        /// Method used to return an account based on the ID parameter 
        /// passed to the method
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Accounts>> GetAccounts(int id)
        {
          if (_context.Accounts == null)
          {
              return NotFound();
          }
            var accounts = await _context.Accounts.FindAsync(id);

            if (accounts == null)
            {
                return NotFound();
            }

            return accounts;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccounts(int id, Accounts accounts)
        {
            if (id != accounts.ID)
            {
                return BadRequest();
            }

            _context.Entry(accounts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Method use to POST a new account
        /// </summary>
        /// <param name="accounts"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Accounts>> PostAccounts(Accounts accounts)
        {
          if (_context.Accounts == null)
          {
              return Problem("Entity set 'MOPUNDB.Accounts'  is null.");
          }
            _context.Accounts.Add(accounts);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccounts", new { id = accounts.ID }, accounts);
        }

        /// <summary>
        /// Method used to delete an account from Database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccounts(int id)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
            }
            var accounts = await _context.Accounts.FindAsync(id);
            if (accounts == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(accounts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Private method to chek if account existe returns true/false
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool AccountsExists(int id)
        {
            return (_context.Accounts?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
