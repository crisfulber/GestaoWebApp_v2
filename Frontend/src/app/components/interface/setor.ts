import { Unidade } from './unidade';

export interface Setor {
    Id: number;
    NomeSetor: string;
    IdUnidade: number;
    Unidade?: Unidade;
}