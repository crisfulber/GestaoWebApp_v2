using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Escolaridade")]
    public class Escolaridade
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira a escolaridade")]
        public required string NomeEscolaridade { get; set; }
    }
}