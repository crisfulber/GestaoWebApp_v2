using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeriodoController : ControllerBase
    {
        private readonly AppDbContext _context; 
        public PeriodoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Periodo>>> GetPeriodos()
        {
            return await _context.Periodos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Periodo>> GetPeriodo(int id)
        {
            var periodo = await _context.Periodos.FindAsync(id);

            if (periodo == null)
            {
                return NotFound();
            }

            return periodo;
        }

        [HttpPost]
        public async Task<ActionResult<Periodo>> PostPeriodo(Periodo periodo)
        {
            _context.Periodos.Add(periodo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPeriodo", new { id = periodo.Id }, periodo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPeriodo(int id, Periodo periodo)
        {
            if (id != periodo.Id)
            {
                return BadRequest();
            }

            _context.Entry(periodo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PeriodoExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePeriodo(int id)
        {
            var periodo = await _context.Periodos.FindAsync(id);
            if (periodo == null)
            {
                return NotFound();
            }

            _context.Periodos.Remove(periodo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PeriodoExists(int id)
        {
            return _context.Periodos.Any(e => e.Id == id);
        }
    }
}