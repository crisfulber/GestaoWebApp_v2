using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Nacionalidade")]
    public class Nacionalidade
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira a nacionalidade")]
        public required string NomeNacionalidade { get; set; }
    }
}