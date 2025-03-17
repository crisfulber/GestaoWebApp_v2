using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Endereco
    {
        [Key]
        public int Id { get; set; }

        
        [StringLength(100)]
        public  string Rua { get; set; }

        
        public int Numero { get; set; }

        [StringLength(50)]
        public string? Complemento { get; set; }

       
        [StringLength(50)]
        public  string Bairro { get; set; }

        
        [StringLength(10)]
        public  string CEP { get; set; }

        [ForeignKey("Municipio")]
        public int IdMunicipio { get; set; }
        public virtual Municipio? Municipio { get; set; }

        [ForeignKey("Estado")]
        public int IdEstado { get; set; }
        public virtual Estado? Estado { get; set; }
    }
}