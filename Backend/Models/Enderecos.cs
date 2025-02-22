using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Endereco
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Rua é obrigatória")]
        [StringLength(100)]
        public required string Rua { get; set; }

        [Required(ErrorMessage = "Número é obrigatório")]
        public int Numero { get; set; }

        [StringLength(50)]
        public string? Complemento { get; set; }

        [Required(ErrorMessage = "Bairro é obrigatório")]
        [StringLength(50)]
        public required string Bairro { get; set; }

        [Required(ErrorMessage = "CEP é obrigatório")]
        [StringLength(9)]
        public required string CEP { get; set; }

        [ForeignKey("Municipio")]
        public int IdMunicipio { get; set; }
        public virtual Municipio? Municipio { get; set; }

        [ForeignKey("Estado")]
        public int IdEstado { get; set; }
        public virtual Estado? Estado { get; set; }
    }
}