using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Conta>>> GetContas()
        {
            return await _context.Contas.Include(c => c.Banco).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Conta>> GetConta(int id)
        {
            var conta = await _context.Contas.Include(c => c.Banco).FirstOrDefaultAsync(c => c.Id == id);

            if (conta == null)
            {
                return NotFound();
            }

            return conta;
        }

        [HttpPost]
        public async Task<ActionResult<Conta>> PostConta(Conta conta)
        {
            _context.Contas.Add(conta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConta", new { id = conta.Id }, conta);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutConta(int id, Conta conta)
        {
            if (id != conta.Id)
            {
                return BadRequest();
            }

            _context.Entry(conta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContaExists(id))
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
        public async Task<IActionResult> DeleteConta(int id)
        {
            var conta = await _context.Contas.FindAsync(id);
            if (conta == null)
            {
                return NotFound();
            }

            _context.Contas.Remove(conta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContaExists(int id)
        {
            return _context.Contas.Any(e => e.Id == id);
        }
    }
}