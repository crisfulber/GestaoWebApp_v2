using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<DocumentoController> _logger;

        public DocumentoController(AppDbContext context, ILogger<DocumentoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Documento>>> GetDocumentos()
        {
            try
            {
                return await _context.Documentos
                    .Include(d => d.UF_RG_Estado)
                    .Include(d => d.UF_CTPS_Estado)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de documentos.");
                return StatusCode(500, "Erro ao obter a lista de documentos.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Documento>> GetDocumento(int id)
        {
            try
            {
                var documento = await _context.Documentos
                    .Include(d => d.UF_RG_Estado)
                    .Include(d => d.UF_CTPS_Estado)
                    .FirstOrDefaultAsync(d => d.Id == id);

                if (documento == null)
                {
                    return NotFound();
                }

                return documento;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o documento com ID {id}.");
                return StatusCode(500, "Erro ao obter o documento.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Documento>> PostDocumento(Documento documento)
        {
            try
            {
                if (documento.UF_RG_IdEstado.HasValue && !_context.Estados.Any(e => e.Id == documento.UF_RG_IdEstado.Value))
                {
                    return BadRequest("UF_RG_IdEstado inválido.");
                }

                if (documento.UF_CTPS_IdEstado.HasValue && !_context.Estados.Any(e => e.Id == documento.UF_CTPS_IdEstado.Value))
                {
                    return BadRequest("UF_CTPS_IdEstado inválido.");
                }

                _context.Documentos.Add(documento);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetDocumento", new { id = documento.Id }, documento);
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo documento - Erro de validação.");
                return BadRequest(new { message = "Erro ao criar um novo documento - Erro de validação.", error = ex.InnerException?.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar um novo documento.");
                return StatusCode(500, new { message = "Erro ao criar um novo documento.", error = ex.ToString() });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocumento(int id, Documento documento)
        {
            if (id != documento.Id)
            {
                return BadRequest();
            }

            _context.Entry(documento).State = EntityState.Modified;

            try
            {
                if (documento.UF_RG_IdEstado.HasValue && !_context.Estados.Any(e => e.Id == documento.UF_RG_IdEstado.Value))
                {
                    return BadRequest("UF_RG_IdEstado inválido.");
                }

                if (documento.UF_CTPS_IdEstado.HasValue && !_context.Estados.Any(e => e.Id == documento.UF_CTPS_IdEstado.Value))
                {
                    return BadRequest("UF_CTPS_IdEstado inválido.");
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!DocumentoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o documento com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o documento.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o documento com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o documento.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocumento(int id)
        {
            try
            {
                var documento = await _context.Documentos.FindAsync(id);
                if (documento == null)
                {
                    return NotFound();
                }

                _context.Documentos.Remove(documento);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o documento com ID {id}.");
                return StatusCode(500, "Erro ao excluir o documento.");
            }
        }

        private bool DocumentoExists(int id)
        {
            return _context.Documentos.Any(e => e.Id == id);
        }
    }
}