using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Conta
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Banco")]
        public int? IdBanco { get; set; }

        public int? Agencia { get; set; }

        public int? NumConta { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? PIX { get; set; }

        public virtual Banco? Banco { get; set; }
    }
}