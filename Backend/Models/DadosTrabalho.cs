using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class DadosTrabalho
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? NumRegistro { get; set; }

        [Required]
        [Column(TypeName = "LONGTEXT")]
        public required string DtInicio { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? DtRegistro { get; set; }

        [Required]
        public bool Ativo { get; set; }

        public bool Almoco { get; set; }

        public bool Adiantamento { get; set; }

        public bool ValeTransporte { get; set; }

        public bool Bonifica { get; set; }
    }
}