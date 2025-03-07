using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Funcoes")]
    public class Funcao
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira o nome da função")]
        public required string NomeFuncao { get; set; }

        [ForeignKey("Setor")]
        public int IdSetor { get; set; }
        public virtual Setor? Setor { get; set; }

    }
}