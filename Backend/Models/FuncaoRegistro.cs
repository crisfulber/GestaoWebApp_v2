using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("FuncaoRegistro")]
    public class FuncaoRegistro
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira a função")]
        public required string Funcao { get; set; }

        [Required(ErrorMessage = "Por favor, insira o CBO")]
        public int CBO { get; set; }
    }
}