import { Estado } from "./estado";

export interface Municipio {
  Id: number;
  NomeMunicipio: string;
  IdEstado: number | null;
  estado?: Estado;
  SiglaEstado?: string;
}