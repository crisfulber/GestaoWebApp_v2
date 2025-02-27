using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BancoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<BancoController> _logger;

        public BancoController(AppDbContext context, ILogger<BancoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Banco>>> GetBancos()
        {
            try
            {
                return await _context.Bancos.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Bancos.");
                return StatusCode(500, "Erro ao obter a lista de Bancos.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Banco>> GetBanco(int id)
        {
            try
            {
                var banco = await _context.Bancos.FindAsync(id);

                if (banco == null)
                {
                    return NotFound();
                }

                return banco;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o banco com ID {id}.");
                return StatusCode(500, "Erro ao obter o banco.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Banco>> PostBanco(Banco banco)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Bancos.Add(banco);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBanco", new { id = banco.Id }, banco);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo banco.");
                return StatusCode(500, "Erro ao criar um novo banco.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBanco(int id, Banco bancoAtualizado)
        {
            if (id != bancoAtualizado.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var bancoExistente = await _context.Bancos.FindAsync(id);
                if (bancoExistente == null)
                {
                    return NotFound();
                }

                bancoExistente.NomeBanco = bancoAtualizado.NomeBanco;
                bancoExistente.Codigo = bancoAtualizado.Codigo;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!BancoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o banco com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o banco.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o banco com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o banco.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBanco(int id)
        {
            try
            {
                var banco = await _context.Bancos.FindAsync(id);
                if (banco == null)
                {
                    return NotFound();
                }

                _context.Bancos.Remove(banco);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o banco com ID {id}.");
                return StatusCode(500, "Erro ao excluir o banco.");
            }
        }

        private bool BancoExists(int id)
        {
            return _context.Bancos.Any(e => e.Id == id);
        }
    }
}