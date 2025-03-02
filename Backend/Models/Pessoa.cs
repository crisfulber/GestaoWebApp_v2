using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Pessoa
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "LONGTEXT")]
        public string? NomePessoa { get; set; }

        public int? IdDadosPessoais { get; set; }
        public virtual DadosPessoais? DadosPessoais { get; set; }

        public int? IdDocumentos { get; set; }
        public virtual Documento? Documento { get; set; }

        public int? IdDependentes { get; set; }
        public virtual Dependente? Dependente { get; set; }

        public int? IdEnderecos { get; set; }
        public virtual Endereco? Endereco { get; set; }

        public int? IdContatos { get; set; }
        public virtual Contato? Contato { get; set; }

        public int? IdDadosTrabalho { get; set; }
        public virtual DadosTrabalho? DadosTrabalho { get; set; }

        public int? IdFuncoes { get; set; }
        public virtual Funcao? Funcao { get; set; }

        public int? IdContas { get; set; } 
        public virtual Conta? Conta { get; set; } 
        
        public int? IdSalarios { get; set; }
        public virtual Salario? Salario { get; set; }
    }
}