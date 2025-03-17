using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("FuncaoRegistro")]
    public class FuncaoRegistro
    {
        [Key]
        public int Id { get; set; }

        
        public  string Funcao { get; set; }

        
        public int CBO { get; set; }
    }
}