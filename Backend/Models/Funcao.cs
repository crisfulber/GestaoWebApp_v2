using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Funcoes")]
    public class Funcao
    {
        [Key]
        public int Id { get; set; }

        
        public  string NomeFuncao { get; set; }

        [ForeignKey("Setor")]
        public int IdSetor { get; set; }
        public virtual Setor? Setor { get; set; }

    }
}