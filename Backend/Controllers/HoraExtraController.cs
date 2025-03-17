using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HoraExtraController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<HoraExtraController> _logger;

        public HoraExtraController(AppDbContext context, ILogger<HoraExtraController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HoraExtra>>> GetHorasExtras()
        {
            try
            {
                return await _context.HorasExtras.Include(a => a.Pessoa).Include(a => a.TipoHora).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de HorasExtras.");
                return StatusCode(500, new { message = "Erro ao obter a lista de HorasExtras.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HoraExtra>> GetHoraExtra(int id)
        {
            try
            {
                var horaExtra = await _context.HorasExtras.Include(a => a.Pessoa).Include(a => a.TipoHora).FirstAsync(a => a.Id == id);

                if (horaExtra == null)
                {
                    return NotFound(new { message = "HoraExtra não encontrada." });
                }

                return horaExtra;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a HoraExtra com ID {id}.");
                return StatusCode(500, new { message = "Erro ao obter a HoraExtra.", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<HoraExtra>> PostHoraExtra(HoraExtra horaExtra)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.HorasExtras.Add(horaExtra);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetHoraExtra", new { id = horaExtra.Id }, horaExtra);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova HoraExtra.");
                return StatusCode(500, new { message = "Erro ao criar uma nova HoraExtra.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHoraExtra(int id, HoraExtra horaExtraAtualizada)
        {
            if (id != horaExtraAtualizada.Id)
            {
                return BadRequest(new { message = "O ID na rota não corresponde ao ID no corpo da requisição." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var horaExtraExistente = await _context.HorasExtras.FindAsync(id);
                if (horaExtraExistente == null)
                {
                    return NotFound(new { message = "HoraExtra não encontrada." });
                }

                // Mapeia as propriedades
                horaExtraExistente.IdPessoa = horaExtraAtualizada.IdPessoa;
                horaExtraExistente.Data = horaExtraAtualizada.Data;
                horaExtraExistente.Horas = horaExtraAtualizada.Horas;
                horaExtraExistente.IdTipoHora = horaExtraAtualizada.IdTipoHora;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!HoraExtraExists(id))
                {
                    return NotFound(new { message = "HoraExtra não encontrada." });
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a HoraExtra com ID {id}.");
                    return StatusCode(500, new { message = "Erro de concorrência ao atualizar a HoraExtra.", error = ex.Message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a HoraExtra com ID {id}.");
                return StatusCode(500, new { message = "Erro ao atualizar a HoraExtra.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHoraExtra(int id)
        {
            try
            {
                var horaExtra = await _context.HorasExtras.FindAsync(id);
                if (horaExtra == null)
                {
                    return NotFound(new { message = "HoraExtra não encontrada." });
                }

                _context.HorasExtras.Remove(horaExtra);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a HoraExtra com ID {id}.");
                return StatusCode(500, new { message = "Erro ao excluir a HoraExtra.", error = ex.Message });
            }
        }

        private bool HoraExtraExists(int id)
        {
            return _context.HorasExtras.Any(e => e.Id == id);
        }
    }
}
