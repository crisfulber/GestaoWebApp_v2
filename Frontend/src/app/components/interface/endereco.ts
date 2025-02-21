export interface Endereco {
  Id: number;
  Rua: string;
  Numero: number;
  Complemento?: string;
  Bairro: string;
  IdMunicipio: number | null; 
  IdEstado: number | null;
  CEP: string;
  NomeMunicipio?: string;
  SiglaEstado?: string;
}