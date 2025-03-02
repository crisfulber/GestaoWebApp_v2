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
    public class DadosPessoaisController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DadosPessoaisController> _logger;

        public DadosPessoaisController(AppDbContext context, ILogger<DadosPessoaisController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DadosPessoais>>> GetDadosPessoais()
        {
            try
            {
                return await _context.DadosPessoais.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Dados Pessoais.");
                return StatusCode(500, "Erro ao obter a lista de Dados Pessoais.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DadosPessoais>> GetDadosPessoais(int id)
        {
            try
            {
                var dadosPessoais = await _context.DadosPessoais.FindAsync(id);

                if (dadosPessoais == null)
                {
                    return NotFound();
                }

                return dadosPessoais;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter os dados pessoais com ID {id}.");
                return StatusCode(500, "Erro ao obter os dados pessoais.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<DadosPessoais>> PostDadosPessoais(DadosPessoais dadosPessoais)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.DadosPessoais.Add(dadosPessoais);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDadosPessoais", new { id = dadosPessoais.Id }, dadosPessoais);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo registro de dados pessoais.");
                return StatusCode(500, "Erro ao criar um novo registro de dados pessoais.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDadosPessoais(int id, DadosPessoais dadosPessoaisAtualizados)
        {
            if (id != dadosPessoaisAtualizados.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var dadosPessoaisExistente = await _context.DadosPessoais.FindAsync(id);
                if (dadosPessoaisExistente == null)
                {
                    return NotFound();
                }

                dadosPessoaisExistente.NomePai = dadosPessoaisAtualizados.NomePai;
                dadosPessoaisExistente.NomeMae = dadosPessoaisAtualizados.NomeMae;
                dadosPessoaisExistente.IdMunicipio = dadosPessoaisAtualizados.IdMunicipio;
                dadosPessoaisExistente.IdNacionalidade = dadosPessoaisAtualizados.IdNacionalidade;
                dadosPessoaisExistente.DtNascimento = dadosPessoaisAtualizados.DtNascimento;
                dadosPessoaisExistente.IdEstadoCivil = dadosPessoaisAtualizados.IdEstadoCivil;
                dadosPessoaisExistente.IdEscolaridade = dadosPessoaisAtualizados.IdEscolaridade;
                dadosPessoaisExistente.NomeConjuge = dadosPessoaisAtualizados.NomeConjuge;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!DadosPessoaisExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar os dados pessoais com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar os dados pessoais.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar os dados pessoais com ID {id}.");
                return StatusCode(500, "Erro ao atualizar os dados pessoais.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDadosPessoais(int id)
        {
            try
            {
                var dadosPessoais = await _context.DadosPessoais.FindAsync(id);
                if (dadosPessoais == null)
                {
                    return NotFound();
                }

                _context.DadosPessoais.Remove(dadosPessoais);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir os dados pessoais com ID {id}.");
                return StatusCode(500, "Erro ao excluir os dados pessoais.");
            }
        }

        private bool DadosPessoaisExists(int id)
        {
            return _context.DadosPessoais.Any(e => e.Id == id);
        }
    }
}