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

         
        [Column(TypeName = "LONGTEXT")]
        public string DtInicio { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? DtRegistro { get; set; }

        public bool Ativo { get; set; }

        public bool Almoco { get; set; }

        public bool Adiantamento { get; set; }

        public bool ValeTransporte { get; set; }

        public bool Bonifica { get; set; }
    }
}