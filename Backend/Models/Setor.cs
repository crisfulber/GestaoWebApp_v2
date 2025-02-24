using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Setores")]
    public class Setor
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira o nome do setor")]
        public required string NomeSetor { get; set; }

        [ForeignKey("Unidade")]
        public int IdUnidade { get; set; }
        public virtual Unidade? Unidade { get; set; }
    }
}