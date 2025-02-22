export interface Empresa {
    Id: number;
    NomeEmpresa: string;
    CNPJ_CEI: string;
    IdEndereco: number | null;
    IdContato: number | null;
    Endereco?: any;
    Contato?: any;
}