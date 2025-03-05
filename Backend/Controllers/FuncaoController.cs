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
                return await _context.Funcoes.ToListAsync();
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

        [HttpPost]
        public async Task<ActionResult<Funcao>> PostFuncao(Funcao funcao)
        {
            try
            {
                _context.Funcoes.Add(funcao);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFuncao", new { id = funcao.Id }, funcao);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo funcao.");
                return StatusCode(500, "Erro ao criar um novo funcao.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFuncao(int id, Funcao funcao)
        {
            if (id != funcao.Id)
            {
                return BadRequest();
            }

            _context.Entry(funcao).State = EntityState.Modified;

            try
            {
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
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o funcao com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o funcao.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o funcao com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o funcao.");
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