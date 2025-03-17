using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Escolaridade")]
    public class Escolaridade
    {
        [Key]
        public int Id { get; set; }

        
        public  string NomeEscolaridade { get; set; }
    }
}