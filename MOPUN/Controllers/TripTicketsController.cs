using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOPUN.Data;
using MOPUN.Models;

namespace MOPUN.Controllers
{
    /// <summary>
    /// API Controller that deals with GET, POST, PUT and DELETE requests for MOP forms
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TripTicketsController : ControllerBase
    {
        // object for database
        private readonly MOPUNDB _context;

        /// <summary>
        /// Constructor that instantiates database connection
        /// </summary>
        /// <param name="context"></param>
        public TripTicketsController(MOPUNDB context)
        {
            _context = context;
        }


        /// <summary>
        /// Method that returns the list of Trips in DB,
        /// via get request
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripTickets>>> GetTripTickets()
        {
          if (_context.TripTickets == null)
          {
              return NotFound();
          }
            return await _context.TripTickets.ToListAsync();
        }

        /// <summary>
        /// Method that returns a Trip asscoiated with 
        /// the trip id parmeter quered
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<TripTickets>> GetTripTickets(int id)
        {
          if (_context.TripTickets == null)
          {
              return NotFound();
          }
            var tripTickets = await _context.TripTickets.FindAsync(id);

            if (tripTickets == null)
            {
                return NotFound();
            }

            return tripTickets;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="tripTickets"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTripTickets(int id, TripTickets tripTickets)
        {
            if (id != tripTickets.TripId)
            {
                return BadRequest();
            }

            _context.Entry(tripTickets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TripTicketsExists(id))
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
        /// Method that POSTs the data recieved from frontend
        /// mop form by using model class object TripTicketCreateDTO
        /// </summary>
        /// <param name="tripTicketDTO"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<TripTickets>> PostTripTicket(TripTicketCreateDTO tripTicketDTO)
        {
            // Check if ModelState is valid (e.g., for data validation attributes)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Create a new TripTicket entity from the DTO
            var tripTicket = new TripTickets
            {
                CallSign = tripTicketDTO.CallSign,
                Location = tripTicketDTO.Location,
                LastLocation = tripTicketDTO.LastLocation,
                Mobile = tripTicketDTO.Mobile,
                MotoId = tripTicketDTO.MotoId,
                Reason = tripTicketDTO.Reason,
                Priority = tripTicketDTO.Priority,
                StartDate = tripTicketDTO.StartDate,
                StartTime = tripTicketDTO.StartTime,
                EndTime = tripTicketDTO.EndTime
            };

            // Add the new TripTicket to the database
            _context.TripTickets.Add(tripTicket);
            await _context.SaveChangesAsync();

            // Return the newly created TripTicket
            return Ok(tripTicket);
        }



        /// <summary>
        /// Method used to delete a Mop from entry based on the ID parameter sent
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTripTickets(int id)
        {
            if (_context.TripTickets == null)
            {
                return NotFound();
            }
            var tripTickets = await _context.TripTickets.FindAsync(id);
            if (tripTickets == null)
            {
                return NotFound();
            }

            _context.TripTickets.Remove(tripTickets);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TripTicketsExists(int id)
        {
            return (_context.TripTickets?.Any(e => e.TripId == id)).GetValueOrDefault();
        }
    }
}
