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

        public int? IdDocumentos { get; set; }

        public int? IdDependentes { get; set; }

        public int? IdEnderecos { get; set; }

        public int? IdContatos { get; set; }

        public int? IdDadosTrabalho { get; set; }

        public int? IdFuncoes { get; set; }

        public int? IdContas { get; set; }

        public int? IdSalarios { get; set; }

        [ForeignKey("DadosPessoais")]
        public virtual DadosPessoais? DadosPessoais { get; set; }

        [ForeignKey("Documentos")]
        public virtual Documento? Documentos { get; set; }

        [ForeignKey("Dependentes")]
        public virtual Dependente? Dependentes { get; set; }

        [ForeignKey("Enderecos")]
        public virtual Endereco? Enderecos { get; set; }

        [ForeignKey("Contatos")]
        public virtual Contato? Contatos { get; set; }

        [ForeignKey("DadosTrabalho")]
        public virtual DadosTrabalho? DadosTrabalho { get; set; }

        [ForeignKey("Funcoes")]
        public virtual Funcao? Funcoes { get; set; }

        [ForeignKey("Contas")]
        public virtual Conta? Contas { get; set; }

        [ForeignKey("Salarios")]
        public virtual Salario? Salarios { get; set; }
    }
}