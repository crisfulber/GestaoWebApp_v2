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
        public async Task<ActionResult<IEnumerable<Funcao>>> GetFuncoes()
        {
            try
            {
                return await _context.Funcoes
                    .Include(f => f.Setor)  
                    .ThenInclude(s => s.Unidade) 
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de funções.");
                return StatusCode(500, "Erro ao obter a lista de funções.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Funcao>> GetFuncao(int id)
        {
            try
            {
                var funcao = await _context.Funcoes
                    .Include(f => f.Setor)  
                    .ThenInclude(s => s.Unidade) 
                    .FirstOrDefaultAsync(f => f.Id == id);

                if (funcao == null)
                {
                    return NotFound();
                }

                return funcao;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a função com ID {id}.");
                return StatusCode(500, "Erro ao obter a função.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Funcao>> PostFuncao(Funcao funcao)
        {
            try
            {
                if (!_context.Setores.Any(s => s.Id == funcao.IdSetor))
                {
                    return BadRequest("Setor inválido.");
                }

                funcao.NomeFuncao = funcao.NomeFuncao.ToUpper();
                _context.Funcoes.Add(funcao);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFuncao", new { id = funcao.Id }, funcao);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova função.");
                return StatusCode(500, "Erro ao criar uma nova função.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFuncao(int id, Funcao funcao)
        {
            if (id != funcao.Id)
            {
                return BadRequest();
            }

            if (!_context.Setores.Any(s => s.Id == funcao.IdSetor))
            {
                return BadRequest("Setor inválido.");
            }

            _context.Entry(funcao).State = EntityState.Modified;

            try
            {
                funcao.NomeFuncao = funcao.NomeFuncao.ToUpper();
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!FuncaoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a função com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a função.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a função com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a função.");
            }

            return NoContent();
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
                _logger.LogError(ex, $"Erro ao excluir a função com ID {id}.");
                return StatusCode(500, "Erro ao excluir a função.");
            }
        }

        private bool FuncaoExists(int id)
        {
            return _context.Funcoes.Any(e => e.Id == id);
        }
    }
}