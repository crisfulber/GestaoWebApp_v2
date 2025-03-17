using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Empresa
    {
        [Key]
        public int Id { get; set; }

        
        [StringLength(80, ErrorMessage = "O nome deve ter no máximo 80 caracteres")]
        public  string NomeEmpresa { get; set; }

        [StringLength(18, ErrorMessage = "Por favor, insira um CNPJ válido")]
        public  string CNPJ_CEI { get; set; }

        [ForeignKey("Endereco")]
        public int? IdEndereco { get; set; }
        public virtual Endereco? Endereco { get; set; } = null!;
        public int? IdContato { get; set; }

        [ForeignKey("IdContato")]
        public Contato? Contato { get; set; }
    }
}