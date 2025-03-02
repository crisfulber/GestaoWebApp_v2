export interface Pessoa {
    Id: number;
    NomePessoa?: string;
    IdDadosPessoais?: number | null;
    IdDocumentos?: number | null;
    IdDependentes?: number | null;
    IdEnderecos?: number | null;
    IdContatos?: number | null;
    IdDadosTrabalho?: number | null;
    IdFuncoes?: number | null;
    IdContas?: number | null;
    IdSalarios?: number | null;
}