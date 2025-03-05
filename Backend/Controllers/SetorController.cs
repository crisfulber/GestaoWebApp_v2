using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SetorController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<SetorController> _logger;

        public SetorController(AppDbContext context, ILogger<SetorController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Setor>>> GetSetores()
        {
            try
            {
                return await _context.Setores.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de setores.");
                return StatusCode(500, "Erro ao obter a lista de setores.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Setor>> GetSetor(int id)
        {
            try
            {
                var setor = await _context.Setores.FindAsync(id);

                if (setor == null)
                {
                    return NotFound();
                }

                return setor;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o setor com ID {id}.");
                return StatusCode(500, "Erro ao obter o setor.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Setor>> PostSetor(Setor setor)
        {
            try
            {
                _context.Setores.Add(setor);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSetor", new { id = setor.Id }, setor);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo setor.");
                return StatusCode(500, "Erro ao criar um novo setor.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSetor(int id, Setor setor)
        {
            if (id != setor.Id)
            {
                return BadRequest();
            }

            _context.Entry(setor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!SetorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o setor com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o setor.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o setor com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o setor.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSetor(int id)
        {
            try
            {
                var setor = await _context.Setores.FindAsync(id);
                if (setor == null)
                {
                    return NotFound();
                }

                _context.Setores.Remove(setor);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o setor com ID {id}.");
                return StatusCode(500, "Erro ao excluir o setor.");
            }
        }

        private bool SetorExists(int id)
        {
            return _context.Setores.Any(e => e.Id == id);
        }
    }
}