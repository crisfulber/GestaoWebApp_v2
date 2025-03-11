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
                return StatusCode(500, new { message = "Erro ao obter a lista de Pessoas.", error = ex.Message });
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
                    return NotFound(new { message = "Pessoa não encontrada." }); 
                }

                return pessoa;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a pessoa com ID {id}.");
                return StatusCode(500, new { message = "Erro ao obter a pessoa.", error = ex.Message });
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
                return StatusCode(500, new { message = "Erro ao criar uma nova pessoa.", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPessoa(int id, Pessoa pessoaAtualizada)
        {
            if (id != pessoaAtualizada.Id)
            {
                return BadRequest(new { message = "O ID na rota não corresponde ao ID no corpo da requisição." });
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
                    return NotFound(new { message = "Pessoa não encontrada." });
                }

                pessoaExistente.NomePessoa = pessoaAtualizada.NomePessoa;
                pessoaExistente.IdDadosPessoais = pessoaAtualizada.IdDadosPessoais;
                pessoaExistente.IdDocumentos = pessoaAtualizada.IdDocumentos;
                pessoaExistente.IdDependentes = pessoaAtualizada.IdDependentes;
                pessoaExistente.IdEnderecos = pessoaAtualizada.IdEnderecos;
                pessoaExistente.IdContatos = pessoaAtualizada.IdContatos;
                pessoaExistente.IdDadosTrabalho = pessoaAtualizada.IdDadosTrabalho;
                pessoaExistente.IdFuncoes = pessoaAtualizada.IdFuncoes;
                pessoaExistente.IdSetores = pessoaAtualizada.IdSetores;
                pessoaExistente.IdUnidades = pessoaAtualizada.IdUnidades;
                pessoaExistente.IdContas = pessoaAtualizada.IdContas;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!PessoaExists(id))
                {
                    return NotFound(new { message = "Pessoa não encontrada." });
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a pessoa com ID {id}.");
                    return StatusCode(500, new { message = "Erro de concorrência ao atualizar a pessoa.", error = ex.Message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a pessoa com ID {id}.");
                return StatusCode(500, new { message = "Erro ao atualizar a pessoa.", error = ex.Message });
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
                    return NotFound(new { message = "Pessoa não encontrada." });
                }

                _context.Pessoas.Remove(pessoa);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a pessoa com ID {id}.");
                return StatusCode(500, new { message = "Erro ao excluir a pessoa.", error = ex.Message });
            }
        }

        private bool PessoaExists(int id)
        {
            return _context.Pessoas.Any(e => e.Id == id);
        }
    }
}