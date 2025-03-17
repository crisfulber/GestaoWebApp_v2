using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("HorasFaltas")]
    public class HoraFalta
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Pessoa")]
        public int? IdPessoa { get; set; }
        public virtual Pessoa? Pessoa { get; set; }

        [Column(TypeName = "DATE")]
        public DateTime? Data { get; set; }

        [Column(TypeName = "DECIMAL(2,1)")]
        public decimal? Horas { get; set; }

        [ForeignKey("TipoHora")]
        public int? IdTipoHora { get; set; }
        public virtual TipoHora? TipoHora { get; set; }
    }
}
