using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MOPUN.Data;
using MOPUN.Models;

namespace MOPUN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageLogsController : ControllerBase
    {
        private readonly MOPUNDB _context;

        public MessageLogsController(MOPUNDB context)
        {
            _context = context;
        }

        // GET: api/MessageLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageLog>>> GetMessageLog()
        {
          if (_context.MessageLog == null)
          {
              return NotFound();
          }
            return await _context.MessageLog.ToListAsync();
        }

        // GET: api/MessageLogs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MessageLog>> GetMessageLog(int id)
        {
          if (_context.MessageLog == null)
          {
              return NotFound();
          }
            var messageLog = await _context.MessageLog.FindAsync(id);

            if (messageLog == null)
            {
                return NotFound();
            }

            return messageLog;
        }

        // PUT: api/MessageLogs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessageLog(int id, MessageLog messageLog)
        {
            if (id != messageLog.Id)
            {
                return BadRequest();
            }

            _context.Entry(messageLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageLogExists(id))
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

        // POST: api/MessageLogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("AddMessage")]
        public async Task<ActionResult<MessageRequest>> PostMessageLog(MessageRequest message)
        {
            // Check if ModelState is valid (e.g., for data validation attributes)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                // Create a new Message entity
                var newMessage = new MessageLog
                {
                    CallSign = message.CallSign?.ToUpper(),
                    Message = message.Message?.ToUpper()
                };

                _context.MessageLog.Add(newMessage);
                await _context.SaveChangesAsync();
            }
             catch (DbUpdateConcurrencyException)
            {
                Console.WriteLine("Test");
            }
            return Ok("Trip ticket created successfully");
        }

        // DELETE: api/MessageLogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessageLog(int id)
        {
            if (_context.MessageLog == null)
            {
                return NotFound();
            }
            var messageLog = await _context.MessageLog.FindAsync(id);
            if (messageLog == null)
            {
                return NotFound();
            }

            _context.MessageLog.Remove(messageLog);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MessageLogExists(int id)
        {
            return (_context.MessageLog?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
