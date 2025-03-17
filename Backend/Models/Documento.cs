using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Documentos")]
    public class Documento
    {
        [Key]
        public int Id { get; set; }

        [StringLength(14)]
        public string? CPF { get; set; }

        public string? RG { get; set; }

        public string? DtEmissaoRG { get; set; }

        public string? OrgaoExpeditor { get; set; }

        public int? UF_RG_IdEstado { get; set; } 

        [ForeignKey("UF_RG_IdEstado")] 
        public Estado? UF_RG_Estado { get; set; } 

        public string? CTPS { get; set; }

        public string? SerieCTPS { get; set; }

        public string? DtEmissaoCTPS { get; set; }

        public int? UF_CTPS_IdEstado { get; set; } 

        [ForeignKey("UF_CTPS_IdEstado")] 
        public Estado? UF_CTPS_Estado { get; set; } 

        [StringLength(14)]
        public string? PIS { get; set; }
    }
}