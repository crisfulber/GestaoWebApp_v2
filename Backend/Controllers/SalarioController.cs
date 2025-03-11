using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<SalarioController> _logger;

        public SalarioController(AppDbContext context, ILogger<SalarioController> logger)
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
                _logger.LogError(ex, "Erro ao obter a lista de salários.");
                return StatusCode(500, new { message = "Erro ao obter a lista de salários.", error = ex.Message });
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
                    return NotFound(new { message = "Salário não encontrado." });
                }

                return salario;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o salário com ID {id}.");
                return StatusCode(500, new { message = "Erro ao obter o salário.", error = ex.Message });
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
                return StatusCode(500, new { message = "Erro ao criar um novo salário.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalario(int id, Salario salarioAtualizado)
        {
            if (id != salarioAtualizado.Id)
            {
                return BadRequest(new { message = "O ID na rota não corresponde ao ID no corpo da requisição." });
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
                    return NotFound(new { message = "Salário não encontrado." });
                }

                salarioExistente.Valor = salarioAtualizado.Valor;
                salarioExistente.DtAlteracao = salarioAtualizado.DtAlteracao;
                salarioExistente.SalarioAtivo = salarioAtualizado.SalarioAtivo;
                salarioExistente.IdPessoa = salarioAtualizado.IdPessoa;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!SalarioExists(id))
                {
                    return NotFound(new { message = "Salário não encontrado." });
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o salário com ID {id}.");
                    return StatusCode(500, new { message = "Erro de concorrência ao atualizar o salário.", error = ex.Message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o salário com ID {id}.");
                return StatusCode(500, new { message = "Erro ao atualizar o salário.", error = ex.Message });
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
                    return NotFound(new { message = "Salário não encontrado." });
                }

                _context.Salarios.Remove(salario);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o salário com ID {id}.");
                return StatusCode(500, new { message = "Erro ao excluir o salário.", error = ex.Message });
            }
        }

        private bool SalarioExists(int id)
        {
            return _context.Salarios.Any(e => e.Id == id);
        }
    }
}