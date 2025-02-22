using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContatoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ContatoController> _logger;

        public ContatoController(AppDbContext context, ILogger<ContatoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contato>>> GetContatos()
        {
            try
            {
                return await _context.Contatos.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de Contatos.");
                return StatusCode(500, "Erro ao obter a lista de Contatos.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contato>> GetContato(int id)
        {
            try
            {
                var contato = await _context.Contatos.FindAsync(id);

                if (contato == null)
                {
                    return NotFound();
                }

                return contato;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o contato com ID {id}.");
                return StatusCode(500, "Erro ao obter o contato.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Contato>> PostContato(Contato contato)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Contatos.Add(contato);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetContato", new { id = contato.Id }, contato);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo contato.");
                return StatusCode(500, "Erro ao criar um novo contato.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutContato(int id, Contato contatoAtualizado)
        {
            if (id != contatoAtualizado.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var contatoExistente = await _context.Contatos.FindAsync(id);
                if (contatoExistente == null)
                {
                    return NotFound();
                }

                contatoExistente.Telefone = contatoAtualizado.Telefone;
                contatoExistente.Email = contatoAtualizado.Email;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ContatoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o contato com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o contato.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o contato com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o contato.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContato(int id)
        {
            try
            {
                var contato = await _context.Contatos.FindAsync(id);
                if (contato == null)
                {
                    return NotFound();
                }

                _context.Contatos.Remove(contato);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o contato com ID {id}.");
                return StatusCode(500, "Erro ao excluir o contato.");
            }
        }

        private bool ContatoExists(int id)
        {
            return _context.Contatos.Any(e => e.Id == id);
        }
    }
}