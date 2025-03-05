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

        [StringLength(14)]
        public string? CPF_Dependente { get; set; }

        public DateTime? DtNascimento_Dependente { get; set; }

    }
}