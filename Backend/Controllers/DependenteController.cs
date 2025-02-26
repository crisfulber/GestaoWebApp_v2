using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DependenteController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DependenteController> _logger;

        public DependenteController(AppDbContext context, ILogger<DependenteController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dependente>>> GetDependentes()
        {
            try
            {
                return await _context.Dependentes.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de dependentes.");
                return StatusCode(500, "Erro ao obter a lista de dependentes.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Dependente>> GetDependente(int id)
        {
            try
            {
                var dependente = await _context.Dependentes.FindAsync(id);

                if (dependente == null)
                {
                    return NotFound();
                }

                return dependente;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o dependente com ID {id}.");
                return StatusCode(500, "Erro ao obter o dependente.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Dependente>> PostDependente(Dependente dependente)
        {
            try
            {
                _context.Dependentes.Add(dependente);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDependente", new { id = dependente.Id }, dependente);
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo dependente - Erro de validação.");
                return BadRequest(new { message = "Erro ao criar um novo dependente - Erro de validação.", error = ex.InnerException?.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo dependente.");
                return StatusCode(500, new { message = "Erro ao criar um novo dependente.", error = ex.ToString() });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDependente(int id, Dependente dependente)
        {
            if (id != dependente.Id)
            {
                return BadRequest();
            }

            _context.Entry(dependente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!DependenteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o dependente com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o dependente.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o dependente com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o dependente.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDependente(int id)
        {
            try
            {
                var dependente = await _context.Dependentes.FindAsync(id);
                if (dependente == null)
                {
                    return NotFound();
                }

                _context.Dependentes.Remove(dependente);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o dependente com ID {id}.");
                return StatusCode(500, "Erro ao excluir o dependente.");
            }
        }

        private bool DependenteExists(int id)
        {
            return _context.Dependentes.Any(e => e.Id == id);
        }
    }
}