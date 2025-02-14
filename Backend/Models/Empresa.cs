public class Empresa
{
    public int Id { get; set; }
    public required string NomeEmpresa { get; set; }
    public required string EnderecoRua { get; set; }
    public required string EnderecoNumero { get; set; }
    public required string EnderecoComplemento { get; set; }
    public required string EnderecoBairro { get; set; }
    public required string EnderecoCEP { get; set; }
    public required int IdMunicipio { get; set; }
    public required Municipio Municipio { get; set; }
}