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

        [Required(ErrorMessage = "O campo Mês é obrigatório.")]
        [StringLength(3, ErrorMessage = "O campo Mês deve ter 3 caracteres.")]
        public string Mes { get; set; }

        [Required(ErrorMessage = "O campo Ano é obrigatório.")]
        [Range(0, 99, ErrorMessage = "O campo Ano deve ter 2 digitos")]
        public int Ano { get; set; }
    }
}