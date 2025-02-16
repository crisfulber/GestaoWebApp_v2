using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstadoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EstadoController> _logger;

        public EstadoController(AppDbContext context, ILogger<EstadoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estado>>> GetEstados()
        {
            try
            {
                return await _context.Estados.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de estados.");
                return StatusCode(500, "Erro ao obter a lista de estados.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Estado>> GetEstado(int id)
        {
            try
            {
                var estado = await _context.Estados.FindAsync(id);

                if (estado == null)
                {
                    return NotFound();
                }

                return estado;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o estado com ID {id}.");
                return StatusCode(500, "Erro ao obter o estado.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Estado>> PostEstado(Estado estado)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Estados.Add(estado);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEstado", new { id = estado.Id }, estado);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo estado.");
                return StatusCode(500, "Erro ao criar um novo estado.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstado(int id, Estado estadoAtualizado)
        {
            if (id != estadoAtualizado.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var estadoExistente = await _context.Estados.FindAsync(id);
                if (estadoExistente == null)
                {
                    return NotFound();
                }

                estadoExistente.NomeEstado = estadoAtualizado.NomeEstado;
                estadoExistente.Sigla = estadoAtualizado.Sigla;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EstadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o estado com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o estado.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o estado com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o estado.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstado(int id)
        {
            try
            {
                var estado = await _context.Estados.FindAsync(id);
                if (estado == null)
                {
                    return NotFound();
                }

                _context.Estados.Remove(estado);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o estado com ID {id}.");
                return StatusCode(500, "Erro ao excluir o estado.");
            }
        }

        private bool EstadoExists(int id)
        {
            return _context.Estados.Any(e => e.Id == id);
        }
    }
}