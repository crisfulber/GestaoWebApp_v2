using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipoHoraController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<TipoHoraController> _logger;

        public TipoHoraController(AppDbContext context, ILogger<TipoHoraController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoHora>>> GetTiposHora()
        {
            try
            {
                return await _context.TiposHora.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de TiposHora.");
                return StatusCode(500, new { message = "Erro ao obter a lista de TiposHora.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoHora>> GetTipoHora(int id)
        {
            try
            {
                var tipoHora = await _context.TiposHora.FindAsync(id);

                if (tipoHora == null)
                {
                    return NotFound(new { message = "TipoHora não encontrado." });
                }

                return tipoHora;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o TipoHora com ID {id}.");
                return StatusCode(500, new { message = "Erro ao obter o TipoHora.", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<TipoHora>> PostTipoHora(TipoHora tipoHora)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.TiposHora.Add(tipoHora);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTipoHora", new { id = tipoHora.Id }, tipoHora);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo TipoHora.");
                return StatusCode(500, new { message = "Erro ao criar um novo TipoHora.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipoHora(int id, TipoHora tipoHoraAtualizado)
        {
            if (id != tipoHoraAtualizado.Id)
            {
                return BadRequest(new { message = "O ID na rota não corresponde ao ID no corpo da requisição." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var tipoHoraExistente = await _context.TiposHora.FindAsync(id);
                if (tipoHoraExistente == null)
                {
                    return NotFound(new { message = "TipoHora não encontrado." });
                }

                // Mapeia as propriedades
                tipoHoraExistente.Descricao = tipoHoraAtualizado.Descricao;
                tipoHoraExistente.Valor = tipoHoraAtualizado.Valor;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!TipoHoraExists(id))
                {
                    return NotFound(new { message = "TipoHora não encontrado." });
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o TipoHora com ID {id}.");
                    return StatusCode(500, new { message = "Erro de concorrência ao atualizar o TipoHora.", error = ex.Message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o TipoHora com ID {id}.");
                return StatusCode(500, new { message = "Erro ao atualizar o TipoHora.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipoHora(int id)
        {
            try
            {
                var tipoHora = await _context.TiposHora.FindAsync(id);
                if (tipoHora == null)
                {
                    return NotFound(new { message = "TipoHora não encontrado." });
                }

                _context.TiposHora.Remove(tipoHora);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o TipoHora com ID {id}.");
                return StatusCode(500, new { message = "Erro ao excluir o TipoHora.", error = ex.Message });
            }
        }

        private bool TipoHoraExists(int id)
        {
            return _context.TiposHora.Any(e => e.Id == id);
        }
    }
}
