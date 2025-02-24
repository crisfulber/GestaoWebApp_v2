import { Endereco } from './endereco';
import { Empresa } from './empresa';

export interface Unidade {
    Id: number;
    NomeUnidade: string;
    IdEmpresa: number;
    IdEndereco: number;
    Endereco?: Endereco;
    Empresa?: Empresa;
}