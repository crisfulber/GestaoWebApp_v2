using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MunicipioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MunicipioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Municipio>>> GetMunicipios()
        {
            return await _context.Municipios.Include(e => e.Estado).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Municipio>> GetMunicipio(int id)
        {
            var municipio = await _context.Municipios.FindAsync(id);

            if (municipio == null)
            {
                return NotFound();
            }

            return municipio;
        }

        [HttpPost]
        public async Task<ActionResult<Municipio>> PostMunicipio(Municipio municipio)
        {
            _context.Municipios.Add(municipio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMunicipio", new { id = municipio.Id }, municipio);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMunicipio(int id, Municipio municipio)
        {
            if (id != municipio.Id)
            {
                return BadRequest();
            }

            _context.Entry(municipio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MunicipioExists(id))
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
        public async Task<IActionResult> DeleteMunicipio(int id)
        {
            var municipio = await _context.Municipios.FindAsync(id);
            if (municipio == null)
            {
                return NotFound();
            }

            _context.Municipios.Remove(municipio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MunicipioExists(int id)
        {
            return _context.Municipios.Any(e => e.Id == id);
        }
    }
}