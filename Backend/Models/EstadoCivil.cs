using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("EstadoCivil")]
    public class EstadoCivil
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira a estado civil")]
        public required string SituacaoCivil { get; set; }
    }
}