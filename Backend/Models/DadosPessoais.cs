using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class DadosPessoais
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? NomePai { get; set; }

        [Required]
        [Column(TypeName = "LONGTEXT")]
        public string? NomeMae { get; set; }

        public int? IdMunicipio { get; set; }

        public int? IdNacionalidade { get; set; }

        [Required]
        [Column(TypeName = "LONGTEXT")]
        public string DtNascimento { get; set; }

        public int? IdEstadoCivil { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? NomeConjuge { get; set; }

        public int? IdEscolaridade { get; set; }

    }
}