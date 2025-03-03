export interface Endereco {
  Id: number;
  Rua: string;
  Numero: string | null; 
  Complemento?: string;
  Bairro: string;
  IdMunicipio: number | null; 
  IdEstado: number | null;
  CEP: string;
  NomeMunicipio?: string;
  SiglaEstado?: string;
}