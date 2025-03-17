using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HoraFaltaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<HoraFaltaController> _logger;

        public HoraFaltaController(AppDbContext context, ILogger<HoraFaltaController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HoraFalta>>> GetHorasFaltas()
        {
            try
            {
                return await _context.HorasFaltas.Include(a => a.Pessoa).Include(a => a.TipoHora).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de HorasFaltas.");
                return StatusCode(500, new { message = "Erro ao obter a lista de HorasFaltas.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HoraFalta>> GetHoraFalta(int id)
        {
            try
            {
                var horaFalta = await _context.HorasFaltas.Include(a => a.Pessoa).Include(a => a.TipoHora).FirstAsync(x => x.Id == id);

                if (horaFalta == null)
                {
                    return NotFound(new { message = "HoraFalta não encontrada." });
                }

                return horaFalta;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a HoraFalta com ID {id}.");
                return StatusCode(500, new { message = "Erro ao obter a HoraFalta.", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<HoraFalta>> PostHoraFalta(HoraFalta horaFalta)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.HorasFaltas.Add(horaFalta);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetHoraFalta", new { id = horaFalta.Id }, horaFalta);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova HoraFalta.");
                return StatusCode(500, new { message = "Erro ao criar uma nova HoraFalta.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHoraFalta(int id, HoraFalta horaFaltaAtualizada)
        {
            if (id != horaFaltaAtualizada.Id)
            {
                return BadRequest(new { message = "O ID na rota não corresponde ao ID no corpo da requisição." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var horaFaltaExistente = await _context.HorasFaltas.FindAsync(id);
                if (horaFaltaExistente == null)
                {
                    return NotFound(new { message = "HoraFalta não encontrada." });
                }

                // Mapeia as propriedades
                horaFaltaExistente.IdPessoa = horaFaltaAtualizada.IdPessoa;
                horaFaltaExistente.Data = horaFaltaAtualizada.Data;
                horaFaltaExistente.Horas = horaFaltaAtualizada.Horas;
                horaFaltaExistente.IdTipoHora = horaFaltaAtualizada.IdTipoHora;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!HoraFaltaExists(id))
                {
                    return NotFound(new { message = "HoraFalta não encontrada." });
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a HoraFalta com ID {id}.");
                    return StatusCode(500, new { message = "Erro de concorrência ao atualizar a HoraFalta.", error = ex.Message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a HoraFalta com ID {id}.");
                return StatusCode(500, new { message = "Erro ao atualizar a HoraFalta.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHoraFalta(int id)
        {
            try
            {
                var horaFalta = await _context.HorasFaltas.FindAsync(id);
                if (horaFalta == null)
                {
                    return NotFound(new { message = "HoraFalta não encontrada." });
                }

                _context.HorasFaltas.Remove(horaFalta);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a HoraFalta com ID {id}.");
                return StatusCode(500, new { message = "Erro ao excluir a HoraFalta.", error = ex.Message });
            }
        }

        private bool HoraFaltaExists(int id)
        {
            return _context.HorasFaltas.Any(e => e.Id == id);
        }
    }
}
