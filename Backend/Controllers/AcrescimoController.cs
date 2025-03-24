using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AcrescimoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<AcrescimoController> _logger;

        public AcrescimoController(AppDbContext context, ILogger<AcrescimoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Acrescimo>>> GetAcrescimos()
        {
            try
            {
                return await _context.Acrescimos.Include(a => a.Pessoa).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Acrescimos.");
                return StatusCode(500, new { message = "Erro ao obter a lista de Acrescimos.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Acrescimo>> GetAcrescimo(int id)
        {
            try
            {
                var acrescimo = await _context.Acrescimos.Include(a => a.Pessoa).FirstAsync(x => x.Id == id);

                if (acrescimo == null)
                {
                    return NotFound(new { message = "Acrescimo não encontrado." });
                }

                return acrescimo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o Acrescimo com ID {id}.");
                return StatusCode(500, new { message = "Erro ao obter o Acrescimo.", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Acrescimo>> PostAcrescimo(Acrescimo acrescimo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Acrescimos.Add(acrescimo);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAcrescimo", new { id = acrescimo.Id }, acrescimo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo Acrescimo.");
                return StatusCode(500, new { message = "Erro ao criar um novo Acrescimo.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcrescimo(int id, Acrescimo acrescimoAtualizado)
        {
            if (id != acrescimoAtualizado.Id)
            {
                return BadRequest(new { message = "O ID na rota n�o corresponde ao ID no corpo da requisi��o." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var acrescimoExistente = await _context.Acrescimos.FindAsync(id);
                if (acrescimoExistente == null)
                {
                    return NotFound(new { message = "Acrescimo não encontrado." });
                }

                acrescimoExistente.IdPessoa = acrescimoAtualizado.IdPessoa;
                acrescimoExistente.Valor = acrescimoAtualizado.Valor;
                acrescimoExistente.Data = acrescimoAtualizado.Data;
                acrescimoExistente.Parcelas = acrescimoAtualizado.Parcelas;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!AcrescimoExists(id))
                {
                    return NotFound(new { message = "Acrescimo n�o encontrado." });
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorr�ncia ao atualizar o Acrescimo com ID {id}.");
                    return StatusCode(500, new { message = "Erro de concorr�ncia ao atualizar o Acrescimo.", error = ex.Message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o Acrescimo com ID {id}.");
                return StatusCode(500, new { message = "Erro ao atualizar o Acrescimo.", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcrescimo(int id)
        {
            try
            {
                var acrescimo = await _context.Acrescimos.FindAsync(id);
                if (acrescimo == null)
                {
                    return NotFound(new { message = "Acrescimo n�o encontrado." });
                }

                _context.Acrescimos.Remove(acrescimo);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o Acrescimo com ID {id}.");
                return StatusCode(500, new { message = "Erro ao excluir o Acrescimo.", error = ex.Message });
            }
        }

        private bool AcrescimoExists(int id)
        {
            return _context.Acrescimos.Any(e => e.Id == id);
        }
    }
}
