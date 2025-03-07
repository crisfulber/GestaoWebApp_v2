import { Setor } from './setor';

export interface Funcao {
    Id: number;
    NomeFuncao: string;
    IdSetor:  number | null;
    Setor?: Setor; 
}