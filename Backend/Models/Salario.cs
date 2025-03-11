using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Salarios")]
    public class Salario
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "DECIMAL(18,2)")]
        public decimal Valor { get; set; }

        [Column(TypeName = "DATE")]
        public DateTime DtAlteracao { get; set; }  

        public bool SalarioAtivo { get; set; }

        [ForeignKey("Pessoa")]
        public int IdPessoa { get; set; }
        public virtual Pessoa Pessoa { get; set; }
    }
}