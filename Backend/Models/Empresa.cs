using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Empresa
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Por favor, insira o nome da empresa")]
        [StringLength(80, ErrorMessage = "O nome deve ter no máximo 80 caracteres")]
        public required string NomeEmpresa { get; set; }

        [Required(ErrorMessage = "Por favor, insira um CNPJ válido")]
        [StringLength(18, ErrorMessage = "Por favor, insira um CNPJ válido")]
        public required string CNPJ_CEI { get; set; }

        [ForeignKey("Endereco")]
        public int? IdEndereco { get; set; }
        public virtual Endereco? Endereco { get; set; } = null!;
        public int? IdContato { get; set; }

        [ForeignKey("IdContato")]
        public Contato? Contato { get; set; }
    }
}