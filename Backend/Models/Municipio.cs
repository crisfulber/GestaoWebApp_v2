
public class Municipio
{
   public int Id { get; set; }
   public string NomeMunicipio { get; set; }
   public int IdEstado { get; set; }
   public Estado? Estado { get; set; }
}