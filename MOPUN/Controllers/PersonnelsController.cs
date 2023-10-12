using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOPUN.Data;
using MOPUN.Models;

namespace MOPUN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonnelsController : ControllerBase
    {
        private readonly MOPUNDB _context;

        public PersonnelsController(MOPUNDB context)
        {
            _context = context;
        }

        // GET: api/Personnels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personnel>>> GetPersonnel()
        {
          if (_context.Personnel == null)
          {
              return NotFound();
          }
            return await _context.Personnel.ToListAsync();
        }

        // GET: api/Personnels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Personnel>> GetPersonnel(int id)
        {
          if (_context.Personnel == null)
          {
              return NotFound();
          }
            var personnel = await _context.Personnel.FindAsync(id);

            if (personnel == null)
            {
                return NotFound();
            }

            return personnel;
        }

        // PUT: api/Personnels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonnel(int id, Personnel personnel)
        {
            if (id != personnel.MiNumber)
            {
                return BadRequest();
            }

            _context.Entry(personnel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonnelExists(id))
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

        // POST: api/Personnels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Personnel>> PostPersonnel(Personnel personnel)
        {
          if (_context.Personnel == null)
          {
              return Problem("Entity set 'MOPUNDB.Personnel'  is null.");
          }
            _context.Personnel.Add(personnel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonnel", new { id = personnel.MiNumber }, personnel);
        }

        // DELETE: api/Personnels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonnel(int id)
        {
            if (_context.Personnel == null)
            {
                return NotFound();
            }
            var personnel = await _context.Personnel.FindAsync(id);
            if (personnel == null)
            {
                return NotFound();
            }

            _context.Personnel.Remove(personnel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonnelExists(int id)
        {
            return (_context.Personnel?.Any(e => e.MiNumber == id)).GetValueOrDefault();
        }
    }
}
