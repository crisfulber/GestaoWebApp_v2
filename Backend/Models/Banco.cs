using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Banco
    {
        [Key]
        public int Id { get; set; }
        public string? NomeBanco { get; set; }
        public int Codigo { get; set; }
    }
}