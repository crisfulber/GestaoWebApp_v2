using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("TiposHora")]
    public class TipoHora
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? Descricao { get; set; }

        [Column(TypeName = "DECIMAL(2,1)")]
        public decimal? Valor { get; set; }
    }
}
