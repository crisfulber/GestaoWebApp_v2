using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuncaoRegistroController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<FuncaoRegistroController> _logger;

        public FuncaoRegistroController(AppDbContext context, ILogger<FuncaoRegistroController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FuncaoRegistro>>> GetFuncaoRegistros()
        {
            try
            {
                return await _context.FuncaoRegistros.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de registros de funções.");
                return StatusCode(500, "Erro ao obter a lista de registros de funções.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FuncaoRegistro>> GetFuncaoRegistro(int id)
        {
            try
            {
                var funcaoRegistro = await _context.FuncaoRegistros.FindAsync(id);

                if (funcaoRegistro == null)
                {
                    return NotFound();
                }

                return funcaoRegistro;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o registro de função com ID {id}.");
                return StatusCode(500, "Erro ao obter o registro de função.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<FuncaoRegistro>> PostFuncaoRegistro(FuncaoRegistro funcaoRegistro)
        {
            try
            {
                funcaoRegistro.Funcao = funcaoRegistro.Funcao.ToUpper();
                _context.FuncaoRegistros.Add(funcaoRegistro);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFuncaoRegistro", new { id = funcaoRegistro.Id }, funcaoRegistro);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo registro de função.");
                return StatusCode(500, "Erro ao criar um novo registro de função.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFuncaoRegistro(int id, FuncaoRegistro funcaoRegistro)
        {
            if (id != funcaoRegistro.Id)
            {
                return BadRequest();
            }

            _context.Entry(funcaoRegistro).State = EntityState.Modified;

            try
            {
                funcaoRegistro.Funcao = funcaoRegistro.Funcao.ToUpper();
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!FuncaoRegistroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o registro de função com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o registro de função.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o registro de função com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o registro de função.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuncaoRegistro(int id)
        {
            try
            {
                var funcaoRegistro = await _context.FuncaoRegistros.FindAsync(id);
                if (funcaoRegistro == null)
                {
                    return NotFound();
                }

                _context.FuncaoRegistros.Remove(funcaoRegistro);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o registro de função com ID {id}.");
                return StatusCode(500, "Erro ao excluir o registro de função.");
            }
        }

        private bool FuncaoRegistroExists(int id)
        {
            return _context.FuncaoRegistros.Any(e => e.Id == id);
        }
    }
}