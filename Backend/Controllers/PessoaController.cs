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
    public class PessoaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PessoaController> _logger;

        public PessoaController(AppDbContext context, ILogger<PessoaController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
        {
            try
            {
                return await _context.Pessoas.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Pessoas.");
                return StatusCode(500, "Erro ao obter a lista de Pessoas.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> GetPessoa(int id)
        {
            try
            {
                var pessoa = await _context.Pessoas.FindAsync(id);

                if (pessoa == null)
                {
                    return NotFound();
                }

                return pessoa;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a pessoa com ID {id}.");
                return StatusCode(500, "Erro ao obter a pessoa.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> PostPessoa(Pessoa pessoa)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Pessoas.Add(pessoa);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPessoa", new { id = pessoa.Id }, pessoa);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova pessoa.");
                return StatusCode(500, "Erro ao criar uma nova pessoa.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPessoa(int id, Pessoa pessoaAtualizada)
        {
            if (id != pessoaAtualizada.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var pessoaExistente = await _context.Pessoas.FindAsync(id);
                if (pessoaExistente == null)
                {
                    return NotFound();
                }

                pessoaExistente.NomePessoa = pessoaAtualizada.NomePessoa;
                pessoaExistente.IdDadosPessoais = pessoaAtualizada.IdDadosPessoais;
                pessoaExistente.IdDocumentos = pessoaAtualizada.IdDocumentos;
                pessoaExistente.IdDependentes = pessoaAtualizada.IdDependentes;
                pessoaExistente.IdEnderecos = pessoaAtualizada.IdEnderecos;
                pessoaExistente.IdContatos = pessoaAtualizada.IdContatos;
                pessoaExistente.IdDadosTrabalho = pessoaAtualizada.IdDadosTrabalho;
                pessoaExistente.IdFuncoes = pessoaAtualizada.IdFuncoes;
                pessoaExistente.IdContas = pessoaAtualizada.IdContas;
                pessoaExistente.IdSalarios = pessoaAtualizada.IdSalarios;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!PessoaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a pessoa com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a pessoa.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a pessoa com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a pessoa.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePessoa(int id)
        {
            try
            {
                var pessoa = await _context.Pessoas.FindAsync(id);
                if (pessoa == null)
                {
                    return NotFound();
                }

                _context.Pessoas.Remove(pessoa);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a pessoa com ID {id}.");
                return StatusCode(500, "Erro ao excluir a pessoa.");
            }
        }

        private bool PessoaExists(int id)
        {
            return _context.Pessoas.Any(e => e.Id == id);
        }
    }
}