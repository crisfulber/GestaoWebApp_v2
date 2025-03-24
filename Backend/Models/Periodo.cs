using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Periodos")] 
    public class Periodo
    {
        [Key] 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int Id { get; set; }

        
        [StringLength(3, ErrorMessage = "O campo Mês deve ter 3 caracteres.")]
        public string Mes { get; set; }

        
        [Range(0, 9999, ErrorMessage = "O campo Ano deve ter 4 digitos")]
        public int Ano { get; set; }
    }
}