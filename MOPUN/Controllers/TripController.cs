using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOPUN.Data;
using MOPUN.Models;


namespace MOPUN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {

        private readonly MOPUNDB _context;

        public TripController(MOPUNDB context)
        {
            _context = context;
        }


        [HttpGet("getTrips")]
        public async Task<ActionResult<IEnumerable<TripTickets>>> GetAccounts()
        {
            if (_context.TripTickets == null)
            {
                return NotFound();
            }

            return await _context.TripTickets.ToListAsync();
        }



        [HttpGet("{tripId}")]
        public async Task<ActionResult<TripTicketInfoDTO>> GetTrip(int tripId)
        {
            var tripInfo = await _context.TripTickets
            .Where(t => t.TripId == tripId)
            .Select(t => new TripTicketInfoDTO
            {
                TripId = t.TripId,
                CallSign = t.CallSign,
                Location = t.Location,
                LastLocation = t.LastLocation,
                Mobile = t.Mobile,
                MotoId = t.MotoId,
                Reason = t.Reason,
                Priority = t.Priority,
                StartDate = t.StartDate,
                StartTime = t.StartTime,
                EndTime = t.EndTime,
                Personnel = _context.Personnel
                    .Where(p => _context.PersonnelTrips
                        .Where(pt => pt.TripId == tripId)
                        .Select(pt => pt.BunkerNum)
                        .Contains(p.BunkerNum))
                    .Select(p => new PersonnelDTO
                    {
                        FirstName = p.FirstName,
                        LastName = p.LastName,
                        BunkerNum = p.BunkerNum
                    }).ToList(),

                Vehicle = _context.Vehicles
                .Where(v => _context.VehicleTrips
                .Where(vt => vt.TripId == tripId)
                .Select(vt => vt.Registration)
                .Contains(v.Registration))
                .Select(v => new VehicleInfoDTO
                {
                    Make = v.Make,
                    Model = v.Model,
                    Registration = v.Registration
                }).ToList()

            })
            .FirstOrDefaultAsync();

            if (tripInfo == null)
            {
                return NotFound(); // Trip ticket not found
            }

            return Ok(tripInfo); // Return the combined trip ticket information
        }





        // POST api/<TripController>
        [HttpPost("AddTrip")]
        public async Task<ActionResult<TripTicketRequest>> PostTicket(TripTicketRequest data)
        {
            // Check if ModelState is valid (e.g., for data validation attributes)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                // Create a new TripTicket entity
                var tripTicket = new TripTickets
                {
                    CallSign = data.CallSign,
                    Location = data.PatrolStartPoint,
                    LastLocation = data.PatrolStartPoint,
                    Mobile = data.PatrolMobile,
                    MotoId = data.PatrolMoto,
                    Reason = data.PatrolType,
                    Priority = data.SelectedOption,
                    StartDate = data.PatrolDate,
                    StartTime = TimeSpan.Parse(data.StartTimes),
                    EndTime = TimeSpan.Parse(data.EndTimes)
                };

                // Add the tripTicket entity to the context
                _context.TripTickets.Add(tripTicket);

                // Save changes to get the TripTicket ID
                await _context.SaveChangesAsync();

                // Now that you have the TripTicket ID, set it for each personnel trip and vehicle trip
                foreach (var bunkerNum in data.AddPersonnel)
                {
                    var personnelTrip = new PersonnelTrips
                    {
                        BunkerNum = bunkerNum,
                        TripTickets = tripTicket
                    };

                    _context.PersonnelTrips.Add(personnelTrip);
                }

                foreach (var registration in data.PatrolVehicle)
                {
                    var vehicleTrip = new VehicleTrips
                    {
                        Registration = registration,
                        TripTickets = tripTicket
                    };

                    _context.VehicleTrips.Add(vehicleTrip);
                }

                // Save changes again to associate personnel and vehicle trips with the TripTicket
                await _context.SaveChangesAsync();

                // Return an appropriate response, e.g., the newly created TripTicket or a success message
                return Ok("Trip ticket created successfully");
            }
            catch (Exception ex)
            {
                // Handle any exceptions and return an appropriate error response
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        // PUT: api/TripTickets/5
        [HttpPut("Active/{id}")]
        public async Task<IActionResult> PutTripTicket(string id)
        {
            int ID = int.Parse(id);

            var tripTicket = await _context.TripTickets.FindAsync(ID);

            if (tripTicket == null)
            {
                return NotFound();
            }
            if (tripTicket.Active)
            {
                tripTicket.Active = false;
            }
            else
            {
                // Update the Active property to true
                tripTicket.Active = true;
            }
            // Update the LastDateUpdate and LastTimeUpdate properties
            tripTicket.LastDateUpdate = DateTime.Now.Date;
            tripTicket.LastTimeUpdate = DateTime.Now.TimeOfDay;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Handle concurrency exception if needed
                throw;
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccounts(int id)
        {
            if (_context.TripTickets == null)
            {
                return NotFound();
            }

            var vtrip = await _context.VehicleTrips.FindAsync(id);
            if (vtrip == null)
            {
                return NotFound();
            }

            _context.VehicleTrips.Remove(vtrip);

            await _context.SaveChangesAsync();

            var ptrip = await _context.PersonnelTrips.FindAsync(id);

            if (ptrip == null)
            {
                return NotFound();
            }

            _context.PersonnelTrips.Remove(ptrip);
            await _context.SaveChangesAsync();

            var trip = await _context.TripTickets.FindAsync(id);
           
            if (trip == null)
            {
                return NotFound();
            }

            _context.TripTickets.Remove(trip);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool AccountsExists(int id)
        {
            return (_context.TripTickets?.Any(e => e.TripId == id)).GetValueOrDefault();
        }
    }
}
