using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Escala")]
    public class Escala
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira o nome da escala")]
        public required string NomeEscala { get; set; }

        public string? Descricao { get; set; }
    }
}