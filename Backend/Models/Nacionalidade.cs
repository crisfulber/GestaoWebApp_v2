using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Nacionalidade")]
    public class Nacionalidade
    {
        [Key]
        public int Id { get; set; }

        
        public string NomeNacionalidade { get; set; }
    }
}