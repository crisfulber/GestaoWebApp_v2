using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnderecoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EnderecoController> _logger;

        public EnderecoController(AppDbContext context, ILogger<EnderecoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Endereco>>> GetEnderecos()
        {
            try
            {
                return await _context.Enderecos.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de endereços.");
                return StatusCode(500, "Erro ao obter a lista de endereços.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Endereco>> GetEndereco(int id)
        {
            try
            {
                var endereco = await _context.Enderecos.FindAsync(id);

                if (endereco == null)
                {
                    return NotFound();
                }

                return endereco;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o endereço com ID {id}.");
                return StatusCode(500, "Erro ao obter o endereço.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Endereco>> PostEndereco([FromBody] Endereco endereco)
        {
            _logger.LogInformation($"Recebido IdMunicipio: {endereco.IdMunicipio}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_context.Municipios.Any(m => m.Id == endereco.IdMunicipio))
            {
                return BadRequest("IdMunicipio inválido.");
            }

            if (!_context.Estados.Any(e => e.Id == endereco.IdEstado))
            {
                return BadRequest("IdEstado inválido.");
            }

            _context.Enderecos.Add(endereco);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEndereco", new { id = endereco.Id }, endereco);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEndereco(int id, Endereco enderecoAtualizado)
        {
            if (id != enderecoAtualizado.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (!_context.Municipios.Any(m => m.Id == enderecoAtualizado.IdMunicipio))
                {
                    return BadRequest("IdMunicipio inválido.");
                }

                if (!_context.Estados.Any(e => e.Id == enderecoAtualizado.IdEstado))
                {
                    return BadRequest("IdEstado inválido.");
                }

                var enderecoExistente = await _context.Enderecos.FindAsync(id);
                if (enderecoExistente == null)
                {
                    return NotFound();
                }

                enderecoExistente.Rua = enderecoAtualizado.Rua;
                enderecoExistente.Numero = enderecoAtualizado.Numero;
                enderecoExistente.Complemento = enderecoAtualizado.Complemento;
                enderecoExistente.Bairro = enderecoAtualizado.Bairro;
                enderecoExistente.IdMunicipio = enderecoAtualizado.IdMunicipio;
                enderecoExistente.IdEstado = enderecoAtualizado.IdEstado;
                enderecoExistente.CEP = enderecoAtualizado.CEP;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EnderecoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o endereço com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o endereço.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o endereço com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o endereço.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEndereco(int id)
        {
            try
            {
                var endereco = await _context.Enderecos.FindAsync(id);
                if (endereco == null)
                {
                    return NotFound();
                }

                _context.Enderecos.Remove(endereco);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o endereço com ID {id}.");
                return StatusCode(500, "Erro ao excluir o endereço.");
            }
        }

        private bool EnderecoExists(int id)
        {
            return _context.Enderecos.Any(e => e.Id == id);
        }
    }
}