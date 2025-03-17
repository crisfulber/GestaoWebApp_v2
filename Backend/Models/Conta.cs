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

        public string? Agencia { get; set; }

        public string? NumConta { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? PIX { get; set; }

        public virtual Banco? Banco { get; set; }
    }
}