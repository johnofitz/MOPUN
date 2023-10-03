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
                    PersonnelTrips = _context.PersonnelTrips
                        .Where(pt => pt.TripId == tripId)
                        .Select(pt => pt.BunkerNum)
                        .ToList(),
                    VehicleTrips = _context.VehicleTrips
                        .Where(vt => vt.TripId == tripId)
                        .Select(vt => vt.Registration)
                        .ToList()
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
                    TripId = tripTicket.TripId
                };

                _context.PersonnelTrips.Add(personnelTrip);
            }

            foreach (var registration in data.PatrolVehicle)
            {
                var vehicleTrip = new VehicleTrips
                {
                    Registration = registration,
                    TripId = tripTicket.TripId
                };

                _context.VehicleTrips.Add(vehicleTrip);
            }

            // Save changes again to associate personnel and vehicle trips with the TripTicket
            await _context.SaveChangesAsync();

            // Return an appropriate response, e.g., the newly created TripTicket or a success message
            return Ok("Trip ticket created successfully");
        }

        //// PUT api/<TripController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<TripController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
