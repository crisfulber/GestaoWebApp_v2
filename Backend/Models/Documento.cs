using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Documentos")]
    public class Documento
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira o CPF")]
        [StringLength(14)]
        public required string CPF { get; set; }

        public int? RG { get; set; }

        public DateTime? DtEmissaoRG { get; set; }

        public string? OrgaoExpeditor { get; set; }

        public int? UF_RG_IdEstado { get; set; } 

        [ForeignKey("UF_RG_IdEstado")] 
        public Estado? UF_RG_Estado { get; set; } 

        public int? CTPS { get; set; }

        public int? SerieCTPS { get; set; }

        public DateTime? DtEmissaoCTPS { get; set; }

        public int? UF_CTPS_IdEstado { get; set; } 

        [ForeignKey("UF_CTPS_IdEstado")] 
        public Estado? UF_CTPS_Estado { get; set; } 

        [StringLength(14)]
        public string? PIS { get; set; }
    }
}