using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpresaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<EmpresaController> _logger;

        public EmpresaController(AppDbContext context, ILogger<EmpresaController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empresa>>> GetEmpresas()
        {
            try
            {
                return await _context.Empresas
                    .Include(e => e.Endereco)
                    .Include(e => e.Contato)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de empresas.");
                return StatusCode(500, new { message = "Erro ao obter a lista de empresas.", error = ex.ToString() });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Empresa>> GetEmpresa(int id)
        {
            try
            {
                var empresa = await _context.Empresas
                    .Include(e => e.Endereco)
                    .Include(e => e.Contato)
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (empresa == null)
                {
                    return NotFound();
                }

                return empresa;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter a empresa com ID {id}.");
                return StatusCode(500, "Erro ao obter a empresa.");
            }
        }

        public class EmpresaDto
        {
            public string NomeEmpresa { get; set; }
            public string CNPJ_CEI { get; set; }
            public string Rua { get; set; }
            public int Numero { get; set; }
            public string? Complemento { get; set; }
            public string Bairro { get; set; }
            public string CEP { get; set; }
            public int IdMunicipio { get; set; }
            public int IdEstado { get; set; }
            public string? Telefone { get; set; }
            public string? Email { get; set; }
        }

        [HttpPost]
        public async Task<ActionResult<Empresa>> PostEmpresa([FromBody] EmpresaDto empresaDto)
        {
            _logger.LogInformation($"Recebido Empresa: {empresaDto.NomeEmpresa}");

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var endereco = new Endereco
                {
                    Rua = empresaDto.Rua,
                    Numero = empresaDto.Numero,
                    Complemento = empresaDto.Complemento,
                    Bairro = empresaDto.Bairro,
                    CEP = empresaDto.CEP,
                    IdMunicipio = empresaDto.IdMunicipio,
                    IdEstado = empresaDto.IdEstado
                };
                _context.Enderecos.Add(endereco);
                await _context.SaveChangesAsync();

                var contato = new Contato
                {
                    Telefone = empresaDto.Telefone,
                    Email = empresaDto.Email
                };
                _context.Contatos.Add(contato);
                await _context.SaveChangesAsync();

                var empresa = new Empresa
                {
                    NomeEmpresa = empresaDto.NomeEmpresa,
                    CNPJ_CEI = empresaDto.CNPJ_CEI,
                    IdEndereco = endereco.Id,
                    IdContato = contato.Id
                };
                _context.Empresas.Add(empresa);
                await _context.SaveChangesAsync();

                await _context.Entry(empresa).Reference(e => e.Endereco).LoadAsync();
                await _context.Entry(empresa).Reference(e => e.Contato).LoadAsync();

                return CreatedAtAction("GetEmpresa", new { id = empresa.Id }, empresa);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar uma nova empresa.");
                return StatusCode(500, new { message = "Erro ao criar uma nova empresa.", error = ex.ToString() });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpresa(int id, EmpresaDto empresaDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var empresaExistente = await _context.Empresas
                    .Include(e => e.Endereco)
                    .Include(e => e.Contato)
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (empresaExistente == null)
                {
                    return NotFound();
                }

                empresaExistente.NomeEmpresa = empresaDto.NomeEmpresa;
                empresaExistente.CNPJ_CEI = empresaDto.CNPJ_CEI;

                if (empresaExistente.Endereco != null)
                {
                    empresaExistente.Endereco.Rua = empresaDto.Rua;
                    empresaExistente.Endereco.Numero = empresaDto.Numero;
                    empresaExistente.Endereco.Complemento = empresaDto.Complemento;
                    empresaExistente.Endereco.Bairro = empresaDto.Bairro;
                    empresaExistente.Endereco.CEP = empresaDto.CEP;
                    empresaExistente.Endereco.IdMunicipio = empresaDto.IdMunicipio;
                    empresaExistente.Endereco.IdEstado = empresaDto.IdEstado;
                }

                if (empresaExistente.Contato != null)
                {
                    empresaExistente.Contato.Telefone = empresaDto.Telefone;
                    empresaExistente.Contato.Email = empresaDto.Email;
                }

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!EmpresaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar a empresa com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar a empresa.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar a empresa com ID {id}.");
                return StatusCode(500, "Erro ao atualizar a empresa.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmpresa(int id)
        {
            try
            {
                var empresa = await _context.Empresas.FindAsync(id);
                if (empresa == null)
                {
                    return NotFound();
                }

                _context.Empresas.Remove(empresa);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir a empresa com ID {id}.");
                return StatusCode(500, "Erro ao excluir a empresa.");
            }
        }

        private bool EmpresaExists(int id)
        {
            return _context.Empresas.Any(e => e.Id == id);
        }
    }
}