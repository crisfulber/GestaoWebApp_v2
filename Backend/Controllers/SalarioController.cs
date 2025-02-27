using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalariosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<SalariosController> _logger;

        public SalariosController(AppDbContext context, ILogger<SalariosController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salario>>> GetSalarios()
        {
            try
            {
                return await _context.Salarios.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Salários.");
                return StatusCode(500, "Erro ao obter a lista de Salários.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Salario>> GetSalario(int id)
        {
            try
            {
                var salario = await _context.Salarios.FindAsync(id);

                if (salario == null)
                {
                    return NotFound();
                }

                return salario;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o salário com ID {id}.");
                return StatusCode(500, "Erro ao obter o salário.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Salario>> PostSalario(Salario salario)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Salarios.Add(salario);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSalario", new { id = salario.Id }, salario);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo salário.");
                return StatusCode(500, "Erro ao criar um novo salário.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalario(int id, Salario salarioAtualizado)
        {
            if (id != salarioAtualizado.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var salarioExistente = await _context.Salarios.FindAsync(id);
                if (salarioExistente == null)
                {
                    return NotFound();
                }

                salarioExistente.Valor = salarioAtualizado.Valor;
                salarioExistente.DtAlteracao = salarioAtualizado.DtAlteracao;
                salarioExistente.Ativo = salarioAtualizado.Ativo;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!SalarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o salário com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o salário.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o salário com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o salário.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalario(int id)
        {
            try
            {
                var salario = await _context.Salarios.FindAsync(id);
                if (salario == null)
                {
                    return NotFound();
                }

                _context.Salarios.Remove(salario);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o salário com ID {id}.");
                return StatusCode(500, "Erro ao excluir o salário.");
            }
        }

        private bool SalarioExists(int id)
        {
            return _context.Salarios.Any(e => e.Id == id);
        }
    }
}