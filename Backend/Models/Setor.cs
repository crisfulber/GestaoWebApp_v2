using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Setores")]
    public class Setor
    {
        [Key]
        public int Id { get; set; }

        
        public string NomeSetor { get; set; }

    }
}