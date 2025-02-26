using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Dependentes")]
    public class Dependente
    {
        [Key]
        public int Id { get; set; }

        public string? NomeDependente { get; set; }

        [Required(ErrorMessage = "Por favor, insira o CPF")]
        [StringLength(14)]
        public required string CPF { get; set; }

        public DateTime? DtNascimento { get; set; }

    }
}