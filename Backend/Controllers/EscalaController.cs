using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EscalaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EscalaController> _logger;

        public EscalaController(AppDbContext context, ILogger<EscalaController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Escala>>> GetEscalas()
        {
            try
            {
                return await _context.Escalas.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de escalas.");
                return StatusCode(500, "Erro ao obter a lista de escalas.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Escala>> GetEscala(int id)
        {
            try
            {
                var escala = await _context.Escalas.FindAsync(id);

                if (escala == null)
                {
                    return NotFound();
                }

                return escala;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a escala com ID {id}.");
                return StatusCode(500, "Erro ao obter a escala.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Escala>> PostEscala(Escala escala)
        {
            try
            {
                escala.NomeEscala = escala.NomeEscala.ToUpper();
                _context.Escalas.Add(escala);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEscala", new { id = escala.Id }, escala);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova escala.");
                return StatusCode(500, "Erro ao criar uma nova escala.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEscala(int id, Escala escala)
        {
            if (id != escala.Id)
            {
                return BadRequest();
            }

            _context.Entry(escala).State = EntityState.Modified;

            try
            {
                escala.NomeEscala = escala.NomeEscala.ToUpper();
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EscalaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a escala com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a escala.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a escala com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a escala.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEscala(int id)
        {
            try
            {
                var escala = await _context.Escalas.FindAsync(id);
                if (escala == null)
                {
                    return NotFound();
                }

                _context.Escalas.Remove(escala);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a escala com ID {id}.");
                return StatusCode(500, "Erro ao excluir a escala.");
            }
        }

        private bool EscalaExists(int id)
        {
            return _context.Escalas.Any(e => e.Id == id);
        }
    }
}