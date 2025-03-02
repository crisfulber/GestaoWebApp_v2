using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DadosTrabalhoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DadosTrabalhoController> _logger;

        public DadosTrabalhoController(AppDbContext context, ILogger<DadosTrabalhoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DadosTrabalho>>> GetDadosTrabalho()
        {
            try
            {
                return await _context.DadosTrabalho.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Dados Trabalho.");
                return StatusCode(500, "Erro ao obter a lista de Dados Trabalho.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DadosTrabalho>> GetDadosTrabalho(int id)
        {
            try
            {
                var dadosTrabalho = await _context.DadosTrabalho.FindAsync(id);

                if (dadosTrabalho == null)
                {
                    return NotFound();
                }

                return dadosTrabalho;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter os dados trabalho com ID {id}.");
                return StatusCode(500, "Erro ao obter os dados trabalho.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<DadosTrabalho>> PostDadosTrabalho(DadosTrabalho dadosTrabalho)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.DadosTrabalho.Add(dadosTrabalho);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDadosTrabalho", new { id = dadosTrabalho.Id }, dadosTrabalho);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo registro de dados trabalho.");
                return StatusCode(500, "Erro ao criar um novo registro de dados trabalho.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDadosTrabalho(int id, DadosTrabalho dadosTrabalhoAtualizados)
        {
            if (id != dadosTrabalhoAtualizados.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var dadosTrabalhoExistente = await _context.DadosTrabalho.FindAsync(id);
                if (dadosTrabalhoExistente == null)
                {
                    return NotFound();
                }

                dadosTrabalhoExistente.NumRegistro = dadosTrabalhoAtualizados.NumRegistro;
                dadosTrabalhoExistente.DtInicio = dadosTrabalhoAtualizados.DtInicio;
                dadosTrabalhoExistente.DtRegistro = dadosTrabalhoAtualizados.DtRegistro;
                dadosTrabalhoExistente.Ativo = dadosTrabalhoAtualizados.Ativo;
                dadosTrabalhoExistente.Almoco = dadosTrabalhoAtualizados.Almoco;
                dadosTrabalhoExistente.Adiantamento = dadosTrabalhoAtualizados.Adiantamento;
                dadosTrabalhoExistente.ValeTransporte = dadosTrabalhoAtualizados.ValeTransporte;
                dadosTrabalhoExistente.Bonifica = dadosTrabalhoAtualizados.Bonifica;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!DadosTrabalhoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar os dados trabalho com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar os dados trabalho.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar os dados trabalho com ID {id}.");
                return StatusCode(500, "Erro ao atualizar os dados trabalho.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDadosTrabalho(int id)
        {
            try
            {
                var dadosTrabalho = await _context.DadosTrabalho.FindAsync(id);
                if (dadosTrabalho == null)
                {
                    return NotFound();
                }

                _context.DadosTrabalho.Remove(dadosTrabalho);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir os dados trabalho com ID {id}.");
                return StatusCode(500, "Erro ao excluir os dados trabalho.");
            }
        }

        private bool DadosTrabalhoExists(int id)
        {
            return _context.DadosTrabalho.Any(e => e.Id == id);
        }
    }
}