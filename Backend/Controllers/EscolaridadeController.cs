using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EscolaridadeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EscolaridadeController> _logger;

        public EscolaridadeController(AppDbContext context, ILogger<EscolaridadeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Escolaridade>>> GetEscolaridades()
        {
            try
            {
                return await _context.Escolaridades.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de escolaridades.");
                return StatusCode(500, new { message = "Erro ao obter a lista de escolaridades.", error = ex.ToString() });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Escolaridade>> GetEscolaridade(int id)
        {
            try
            {
                var escolaridade = await _context.Escolaridades.FindAsync(id);

                if (escolaridade == null)
                {
                    return NotFound();
                }

                return escolaridade;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a escolaridade com ID {id}.");
                return StatusCode(500, "Erro ao obter a escolaridade.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Escolaridade>> PostEscolaridade(Escolaridade escolaridade)
        {
            try
            {
                escolaridade.NomeEscolaridade = escolaridade.NomeEscolaridade.ToUpper();
                _context.Escolaridades.Add(escolaridade);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEscolaridade", new { id = escolaridade.Id }, escolaridade);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova escolaridade.");
                return StatusCode(500, "Erro ao criar uma nova escolaridade.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEscolaridade(int id, Escolaridade escolaridade)
        {
            if (id != escolaridade.Id)
            {
                return BadRequest();
            }

            _context.Entry(escolaridade).State = EntityState.Modified;

            try
            {
                escolaridade.NomeEscolaridade = escolaridade.NomeEscolaridade.ToUpper();
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EscolaridadeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a escolaridade com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a escolaridade.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a escolaridade com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a escolaridade.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEscolaridade(int id)
        {
            try
            {
                var escolaridade = await _context.Escolaridades.FindAsync(id);
                if (escolaridade == null)
                {
                    return NotFound();
                }

                _context.Escolaridades.Remove(escolaridade);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a escolaridade com ID {id}.");
                return StatusCode(500, "Erro ao excluir a escolaridade.");
            }
        }

        private bool EscolaridadeExists(int id)
        {
            return _context.Escolaridades.Any(e => e.Id == id);
        }
    }
}