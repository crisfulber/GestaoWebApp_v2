using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnidadeController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<UnidadeController> _logger;

        public UnidadeController(AppDbContext context, ILogger<UnidadeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Unidade>>> GetUnidades()
        {
            try
            {
                return await _context.Unidades
                    .Include(u => u.Empresa) 
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de unidades.");
                return StatusCode(500, "Erro ao obter a lista de unidades.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Unidade>> GetUnidade(int id)
        {
            try
            {
                var unidade = await _context.Unidades
                    .Include(u => u.Endereco) 
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (unidade == null)
                {
                    return NotFound();
                }

                return unidade;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a unidade com ID {id}.");
                return StatusCode(500, "Erro ao obter a unidade.");
            }
        }

        public class UnidadeDto
        {
            public string NomeUnidade { get; set; }
            public int IdEmpresa { get; set; }
            public string Rua { get; set; }
            public int Numero { get; set; }
            public string? Complemento { get; set; }
            public string Bairro { get; set; }
            public string CEP { get; set; }
            public int IdMunicipio { get; set; }
            public int IdEstado { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult<Unidade>> PostUnidade(UnidadeDto unidadeDto)
        {
            try
            {
                var endereco = new Endereco
                {
                    Rua = unidadeDto.Rua,
                    Numero = unidadeDto.Numero,
                    Complemento = unidadeDto.Complemento,
                    Bairro = unidadeDto.Bairro,
                    CEP = unidadeDto.CEP,
                    IdMunicipio = unidadeDto.IdMunicipio,
                    IdEstado = unidadeDto.IdEstado
                };
                _context.Enderecos.Add(endereco);
                await _context.SaveChangesAsync();

                var unidade = new Unidade
                {
                    NomeUnidade = unidadeDto.NomeUnidade,
                    IdEmpresa = unidadeDto.IdEmpresa,
                    IdEndereco = endereco.Id
                };
                _context.Unidades.Add(unidade);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUnidade", new { id = unidade.Id }, unidade);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova unidade.");
                return StatusCode(500, "Erro ao criar uma nova unidade.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUnidade(int id, UnidadeDto unidadeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var unidadeExistente = await _context.Unidades
                .Include(u => u.Endereco)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (unidadeExistente == null)
            {
                return NotFound();
            }

            unidadeExistente.NomeUnidade = unidadeDto.NomeUnidade;
            unidadeExistente.IdEmpresa = unidadeDto.IdEmpresa;

            if (unidadeExistente.Endereco != null)
            {
                unidadeExistente.Endereco.Rua = unidadeDto.Rua;
                unidadeExistente.Endereco.Numero = unidadeDto.Numero;
                unidadeExistente.Endereco.Complemento = unidadeDto.Complemento;
                unidadeExistente.Endereco.Bairro = unidadeDto.Bairro;
                unidadeExistente.Endereco.CEP = unidadeDto.CEP;
                unidadeExistente.Endereco.IdMunicipio = unidadeDto.IdMunicipio;
                unidadeExistente.Endereco.IdEstado = unidadeDto.IdEstado;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!UnidadeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a unidade com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a unidade.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a unidade com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a unidade.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUnidade(int id)
        {
            try
            {
                var unidade = await _context.Unidades.FindAsync(id);
                if (unidade == null)
                {
                    return NotFound();
                }

                _context.Unidades.Remove(unidade);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a unidade com ID {id}.");
                return StatusCode(500, "Erro ao excluir a unidade.");
            }
        }

        private bool UnidadeExists(int id)
        {
            return _context.Unidades.Any(e => e.Id == id);
        }
    }
}