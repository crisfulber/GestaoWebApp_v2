using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MunicipioController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<MunicipioController> _logger;

        public MunicipioController(AppDbContext context, ILogger<MunicipioController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Municipio>>> GetMunicipios()
        {
            try
            {
                return await _context.Municipios.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter a lista de municípios.");
                return StatusCode(500, "Erro ao obter a lista de municípios.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Municipio>> GetMunicipio(int id)
        {
            try
            {
                var municipio = await _context.Municipios.FindAsync(id);

                if (municipio == null)
                {
                    return NotFound();
                }

                return municipio;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao obter o município com ID {id}.");
                return StatusCode(500, "Erro ao obter o município.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Municipio>> PostMunicipio(Municipio municipio)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (!_context.Estados.Any(e => e.Id == municipio.IdEstado))
                {
                    return BadRequest("O IdEstado fornecido não existe.");
                }

                _context.Municipios.Add(municipio);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetMunicipio", new { id = municipio.Id }, municipio);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao criar um novo município: {ex.Message} {ex.StackTrace}");
                return StatusCode(500, "Erro ao criar um novo município.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMunicipio(int id, Municipio municipioAtualizado)
        {
            if (id != municipioAtualizado.Id)
            {
                return BadRequest("O ID na rota não corresponde ao ID no corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (!_context.Estados.Any(e => e.Id == municipioAtualizado.IdEstado))
                {
                    return BadRequest("O IdEstado fornecido não existe.");
                }

                var municipioExistente = await _context.Municipios.FindAsync(id);
                if (municipioExistente == null)
                {
                    return NotFound();
                }

                municipioExistente.NomeMunicipio = municipioAtualizado.NomeMunicipio;
                municipioExistente.IdEstado = municipioAtualizado.IdEstado;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!MunicipioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    _logger.LogError(ex, $"Erro de concorrência ao atualizar o município com ID {id}.");
                    return StatusCode(500, "Erro de concorrência ao atualizar o município.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o município com ID {id}.");
                return StatusCode(500, "Erro ao atualizar o município.");
            }
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMunicipio(int id)
        {
            try
            {
                var municipio = await _context.Municipios.FindAsync(id);
                if (municipio == null)
                {
                    return NotFound();
                }

                _context.Municipios.Remove(municipio);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir o município com ID {id}.");
                return StatusCode(500, "Erro ao excluir o município.");
            }
        }

        private bool MunicipioExists(int id)
        {
            return _context.Municipios.Any(e => e.Id == id);
        }
    }
}