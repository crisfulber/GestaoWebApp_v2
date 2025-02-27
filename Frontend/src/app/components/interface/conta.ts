export interface Conta {
  Id: number;
  IdBanco: number | null;
  Agencia: number | null;
  NumConta: number | null;
  PIX?: string;
  Banco?: {
    Nome: string;
    Id: number;
  };
}