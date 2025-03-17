using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdiantamentoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AdiantamentoController> _logger;

        public AdiantamentoController(AppDbContext context, ILogger<AdiantamentoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Adiantamento>>> GetAdiantamentos()
        {
            try
            {
                return await _context.Adiantamentos.Include(a => a.Pessoa).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Adiantamentos.");
                return StatusCode(500, new { message = "Erro ao obter a lista de Adiantamentos.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Adiantamento>> GetAdiantamento(int id)
        {
            try
            {
                var desconto = await _context.Adiantamentos.Include(a => a.Pessoa).FirstAsync(x => x.Id == id);

                if (desconto == null)
                {
                    return NotFound(new { message = "Adiantamento não encontrado." });
                }

                return desconto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o Adiantamento com ID {id}.");
                return StatusCode(500, new { message = "Erro ao obter o Adiantamento.", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Adiantamento>> PostAdiantamento(Adiantamento desconto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Adiantamentos.Add(desconto);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAdiantamento", new { id = desconto.Id }, desconto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo Adiantamento.");
                return StatusCode(500, new { message = "Erro ao criar um novo Adiantamento.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdiantamento(int id, Adiantamento descontoAtualizado)
        {
            if (id != descontoAtualizado.Id)
            {
                return BadRequest(new { message = "O ID na rota não corresponde ao ID no corpo da requisição." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var descontoExistente = await _context.Adiantamentos.FindAsync(id);
                if (descontoExistente == null)
                {
                    return NotFound(new { message = "Adiantamento não encontrado." });
                }

                descontoExistente.IdPessoa = descontoAtualizado.IdPessoa;
                descontoExistente.Valor = descontoAtualizado.Valor;
                descontoExistente.Data = descontoAtualizado.Data;
                descontoExistente.Parcelas = descontoAtualizado.Parcelas;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!AdiantamentoExists(id))
                {
                    return NotFound(new { message = "Adiantamento não encontrado." });
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o Adiantamento com ID {id}.");
                    return StatusCode(500, new { message = "Erro de concorrência ao atualizar o Adiantamento.", error = ex.Message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o Adiantamento com ID {id}.");
                return StatusCode(500, new { message = "Erro ao atualizar o Adiantamento.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdiantamento(int id)
        {
            try
            {
                var desconto = await _context.Adiantamentos.FindAsync(id);
                if (desconto == null)
                {
                    return NotFound(new { message = "Adiantamento não encontrado." });
                }

                _context.Adiantamentos.Remove(desconto);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o Adiantamento com ID {id}.");
                return StatusCode(500, new { message = "Erro ao excluir o Adiantamento.", error = ex.Message });
            }
        }

        private bool AdiantamentoExists(int id)
        {
            return _context.Adiantamentos.Any(e => e.Id == id);
        }
    }
}
