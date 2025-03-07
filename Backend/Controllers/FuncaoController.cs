using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuncaoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<FuncaoController> _logger;

        public FuncaoController(AppDbContext context, ILogger<FuncaoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Funcao>>> GetFuncaoes()
        {
            try
            {
                return await _context.Funcoes.Include(f => f.Setor).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de funcoes.");
                return StatusCode(500, "Erro ao obter a lista de funcoes.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Funcao>> GetFuncao(int id)
        {
            try
            {
                var funcao = await _context.Funcoes.FindAsync(id);

                if (funcao == null)
                {
                    return NotFound();
                }

                return funcao;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o funcao com ID {id}.");
                return StatusCode(500, "Erro ao obter o funcao.");
            }
        }

        public class FuncaoDto
        {
            public string NomeFuncao { get; set; }
            public int IdSetor { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult<Funcao>> PostFuncao(FuncaoDto funcaoDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (!_context.Setores.Any(e => e.Id == funcaoDto.IdSetor))
                {
                    return BadRequest("O IdSetor fornecido não existe.");
                }

                var funcao = new Funcao
                {
                    NomeFuncao = funcaoDto.NomeFuncao,
                    IdSetor = funcaoDto.IdSetor
                };

                _context.Funcoes.Add(funcao);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFuncao", new { id = funcao.Id }, funcao);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao criar um novo setor: {ex.Message} {ex.StackTrace}");
                return StatusCode(500, "Erro ao criar uma nova função.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFuncao(int id, FuncaoDto funcaoAtualizadoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (!_context.Setores.Any(e => e.Id == funcaoAtualizadoDto.IdSetor))
                {
                    return BadRequest("O IdEstado fornecido não existe.");
                }

                var funcaoExistente = await _context.Funcoes.FindAsync(id);
                if (funcaoExistente == null)
                {
                    return NotFound();
                }

                funcaoExistente.NomeFuncao = funcaoAtualizadoDto.NomeFuncao;
                funcaoExistente.IdSetor = funcaoAtualizadoDto.IdSetor;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!FuncaoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a funcao com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a funcao.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a funcao com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a funcao.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncao(int id)
        {
            try
            {
                var funcao = await _context.Funcoes.FindAsync(id);
                if (funcao == null)
                {
                    return NotFound();
                }

                _context.Funcoes.Remove(funcao);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o funcao com ID {id}.");
                return StatusCode(500, "Erro ao excluir o funcao.");
            }
        }

        private bool FuncaoExists(int id)
        {
            return _context.Funcoes.Any(e => e.Id == id);
        }
    }
}