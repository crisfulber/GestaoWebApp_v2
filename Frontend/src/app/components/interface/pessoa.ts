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
    IdSetores?: number | null;
    IdUnidades?: number | null;
    IdContas?: number | null;
}