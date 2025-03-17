using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("EstadoCivil")]
    public class EstadoCivil
    {
        [Key]
        public int Id { get; set; }

        
        public  string SituacaoCivil { get; set; }
    }
}