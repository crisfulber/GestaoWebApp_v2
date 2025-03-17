using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DescontoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DescontoController> _logger;

        public DescontoController(AppDbContext context, ILogger<DescontoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Desconto>>> GetDescontos()
        {
            try
            {
                return await _context.Descontos.Include(a => a.Pessoa).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Descontos.");
                return StatusCode(500, new { message = "Erro ao obter a lista de Descontos.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Desconto>> GetDesconto(int id)
        {
            try
            {
                var desconto = await _context.Descontos.Include(a => a.Pessoa).FirstAsync(x => x.Id == id);

                if (desconto == null)
                {
                    return NotFound(new { message = "Desconto não encontrado." });
                }

                return desconto;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o Desconto com ID {id}.");
                return StatusCode(500, new { message = "Erro ao obter o Desconto.", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Desconto>> PostDesconto(Desconto desconto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Descontos.Add(desconto);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDesconto", new { id = desconto.Id }, desconto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo Desconto.");
                return StatusCode(500, new { message = "Erro ao criar um novo Desconto.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDesconto(int id, Desconto descontoAtualizado)
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
                var descontoExistente = await _context.Descontos.FindAsync(id);
                if (descontoExistente == null)
                {
                    return NotFound(new { message = "Desconto não encontrado." });
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
                if (!DescontoExists(id))
                {
                    return NotFound(new { message = "Desconto não encontrado." });
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o Desconto com ID {id}.");
                    return StatusCode(500, new { message = "Erro de concorrência ao atualizar o Desconto.", error = ex.Message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o Desconto com ID {id}.");
                return StatusCode(500, new { message = "Erro ao atualizar o Desconto.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesconto(int id)
        {
            try
            {
                var desconto = await _context.Descontos.FindAsync(id);
                if (desconto == null)
                {
                    return NotFound(new { message = "Desconto não encontrado." });
                }

                _context.Descontos.Remove(desconto);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o Desconto com ID {id}.");
                return StatusCode(500, new { message = "Erro ao excluir o Desconto.", error = ex.Message });
            }
        }

        private bool DescontoExists(int id)
        {
            return _context.Descontos.Any(e => e.Id == id);
        }
    }
}
