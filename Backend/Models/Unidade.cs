using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Unidade")]
    public class Unidade
    {
        [Key]
        public int Id { get; set; }

        
        public string NomeUnidade { get; set; }

        [ForeignKey("Empresa")]
        public int IdEmpresa { get; set; }
        public virtual Empresa? Empresa { get; set; }

        [ForeignKey("Endereco")]
        public int IdEndereco { get; set; }
        public virtual Endereco? Endereco { get; set; }
    }
}