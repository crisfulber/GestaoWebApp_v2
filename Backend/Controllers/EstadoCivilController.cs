using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstadoCivilController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EstadoCivilController> _logger;

        public EstadoCivilController(AppDbContext context, ILogger<EstadoCivilController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoCivil>>> GetEstadosCivis()
        {
            try
            {
                return await _context.EstadosCivis.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de estadoscivis.");
                return StatusCode(500, new { message = "Erro ao obter a lista de estadoscivis.", error = ex.ToString() });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EstadoCivil>> GetEstadoCivil(int id)
        {
            try
            {
                var estadocivil = await _context.EstadosCivis.FindAsync(id);

                if (estadocivil == null)
                {
                    return NotFound();
                }

                return estadocivil;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a estadocivil com ID {id}.");
                return StatusCode(500, "Erro ao obter a estadocivil.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<EstadoCivil>> PostEstadoCivil(EstadoCivil estadocivil)
        {
            try
            {
                estadocivil.SituacaoCivil = estadocivil.SituacaoCivil.ToUpper();
                _context.EstadosCivis.Add(estadocivil);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEstadoCivil", new { id = estadocivil.Id }, estadocivil);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova estadocivil.");
                return StatusCode(500, "Erro ao criar uma nova estadocivil.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstadoCivil(int id, EstadoCivil estadocivil)
        {
            if (id != estadocivil.Id)
            {
                return BadRequest();
            }

            _context.Entry(estadocivil).State = EntityState.Modified;

            try
            {
                estadocivil.SituacaoCivil = estadocivil.SituacaoCivil.ToUpper();
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EstadoCivilExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a estadocivil com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a estadocivil.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a estadocivil com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a estadocivil.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstadoCivil(int id)
        {
            try
            {
                var estadocivil = await _context.EstadosCivis.FindAsync(id);
                if (estadocivil == null)
                {
                    return NotFound();
                }

                _context.EstadosCivis.Remove(estadocivil);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a estadocivil com ID {id}.");
                return StatusCode(500, "Erro ao excluir a estadocivil.");
            }
        }

        private bool EstadoCivilExists(int id)
        {
            return _context.EstadosCivis.Any(e => e.Id == id);
        }
    }
}