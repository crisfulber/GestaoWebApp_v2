public class Municipio
{
   public int Id { get; set; }
   public required string NomeMunicipio { get; set; }
   public required int IdEstado { get; set; }
   public required Estado Estado { get; set; }
}