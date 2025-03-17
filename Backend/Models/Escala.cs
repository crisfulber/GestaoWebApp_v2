using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Escala")]
    public class Escala
    {
        [Key]
        public int Id { get; set; }

        
        public  string NomeEscala { get; set; }

        public string? Descricao { get; set; }
    }
}