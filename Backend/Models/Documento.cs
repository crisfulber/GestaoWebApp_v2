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

        [Required(ErrorMessage = "Por favor, insira o RG")]
        public int RG { get; set; }

        public DateTime? DtEmissaoRG { get; set; }

        public string? OrgaoExpeditor { get; set; }

        public string? UF_RG { get; set; }

        public int? CTPS { get; set; }

        public int? SerieCTPS { get; set; }

        public DateTime? DtEmissaoCTPS { get; set; }

        public string? UF_CTPS { get; set; }

        [StringLength(14)]
        public string? PIS { get; set; }
    }
}