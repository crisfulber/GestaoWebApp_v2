public class Endereco
{
    public int Id { get; set; }
    public required string Rua { get; set; }
    public int Numero { get; set; }
    public string? Complemento { get; set; }
    public required string Bairro { get; set; }
    public int IdMunicipio { get; set; }
    public int IdEstado { get; set; }
    public required string CEP { get; set; }
    public Municipio? Municipio { get; set; }
    public Estado? Estado { get; set; }
}