using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Adiantamentos")]
    public class Adiantamento
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Pessoa")]
        public int? IdPessoa { get; set; }

        public Pessoa? Pessoa { get; set; }

        [Column(TypeName = "DECIMAL(6,2)")]
        public decimal? Valor { get; set; }

        [Column(TypeName = "DATE")]
        public DateTime? Data { get; set; }

        public int? Parcelas { get; set; }
    }
}
