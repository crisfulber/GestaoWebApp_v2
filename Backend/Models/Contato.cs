using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Contato
    {
        [Key]
        public int Id { get; set; }
        [StringLength(16)]
        public string? Telefone { get; set; }
        public string? Email { get; set; }
    }
}