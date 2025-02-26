using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NacionalidadeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<NacionalidadeController> _logger;

        public NacionalidadeController(AppDbContext context, ILogger<NacionalidadeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nacionalidade>>> GetNacionalidades()
        {
            try
            {
                return await _context.Nacionalidades.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de nacionalidades.");
                return StatusCode(500, new { message = "Erro ao obter a lista de nacionalidades.", error = ex.ToString() });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Nacionalidade>> GetNacionalidade(int id)
        {
            try
            {
                var nacionalidade = await _context.Nacionalidades.FindAsync(id);

                if (nacionalidade == null)
                {
                    return NotFound();
                }

                return nacionalidade;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a nacionalidade com ID {id}.");
                return StatusCode(500, "Erro ao obter a nacionalidade.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Nacionalidade>> PostNacionalidade(Nacionalidade nacionalidade)
        {
            try
            {
                nacionalidade.NomeNacionalidade = nacionalidade.NomeNacionalidade.ToUpper();
                _context.Nacionalidades.Add(nacionalidade);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetNacionalidade", new { id = nacionalidade.Id }, nacionalidade);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova nacionalidade.");
                return StatusCode(500, "Erro ao criar uma nova nacionalidade.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNacionalidade(int id, Nacionalidade nacionalidade)
        {
            if (id != nacionalidade.Id)
            {
                return BadRequest();
            }

            _context.Entry(nacionalidade).State = EntityState.Modified;

            try
            {
                nacionalidade.NomeNacionalidade = nacionalidade.NomeNacionalidade.ToUpper();
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!NacionalidadeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a nacionalidade com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a nacionalidade.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a nacionalidade com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a nacionalidade.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNacionalidade(int id)
        {
            try
            {
                var nacionalidade = await _context.Nacionalidades.FindAsync(id);
                if (nacionalidade == null)
                {
                    return NotFound();
                }

                _context.Nacionalidades.Remove(nacionalidade);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a nacionalidade com ID {id}.");
                return StatusCode(500, "Erro ao excluir a nacionalidade.");
            }
        }

        private bool NacionalidadeExists(int id)
        {
            return _context.Nacionalidades.Any(e => e.Id == id);
        }
    }
}