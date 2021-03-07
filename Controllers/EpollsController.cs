using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EpollApi.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

namespace EpollApi.Controllers
{
    [Route("api/Epoll")]
    [ApiController]
    public class EpollsController : ControllerBase
    {
        private readonly EpollContext _context;

        public EpollsController(EpollContext context)
        {
            _context = context;
        }

        // GET: api/Epolls
        [HttpGet]
        public IEnumerable<Epoll> GetEpolls()
        {
            return _context.Polls
            .Include(b => b.Options)
            .ToList();
        }

        // GET: api/Epolls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Epoll>> GetEpoll(long id)
        {
            var epoll = await _context.Polls.Include(i => i.Options)
                    .FirstOrDefaultAsync(i => i.Id == id);

            if (epoll == null)
            {
                return NotFound();
            }

            return Ok(epoll);
        }

        // PATCH: api/Epolls/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PutEpoll(long id, JsonPatchDocument<Epoll> epoll)
        {
            var entity = await _context.Polls.Include(i => i.Options)
                    .FirstOrDefaultAsync(i => i.Id == id);
 
        epoll.ApplyTo(entity, ModelState); // Must have Microsoft.AspNetCore.Mvc.NewtonsoftJson installed
        await _context.SaveChangesAsync();
        return NoContent();
        }

        // POST: api/Epolls
        [HttpPost]
        public async Task<ActionResult<Epoll>> PostEpoll(Epoll epoll)
        {
            _context.Polls.Add(epoll);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEpoll), new { id = epoll.Id }, epoll);
        }


        private bool EpollExists(long id)
        {
            return _context.Polls.Any(e => e.Id == id);
        }
    }
    
}
