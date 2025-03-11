import { Pessoa } from "./pessoa";

export interface Salario {
    Id: number;
    Valor: number;
    DtAlteracao: string;
    SalarioAtivo: boolean;
    IdPessoa: number;
    pessoa?: Pessoa;
}