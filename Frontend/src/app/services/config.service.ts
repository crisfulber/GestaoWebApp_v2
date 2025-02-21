import { Injectable } from '@angular/core';

export interface CampoConfig {
  label: string;
  campo: string;
  tipo?: string;
  optionsEndpoint?: string;
  labelField?: string;
  valueField?: string;
  concatFields?: string[];
  suggestions?: (event: any) => any[];
  readonly?: boolean;
  field?: string;
  options?: string;
  template?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configuracoes: { [key: string]: any } = {
    'endereco': {
      titulo: 'Endereços',
      campos: [
        { label: 'Rua', campo: 'Rua', tipo: 'text' },
        { label: 'N°', campo: 'Numero' },
        { label: 'Complemento', campo: 'Complemento' },
        { label: 'Bairro', campo: 'Bairro' },
        { label: 'CEP', campo: 'CEP' },
        {
          label: 'Município',
          campo: 'NomeMunicipio',
          template: `<app-municipio-select [formControl]="form.controls['NomeMunicipio']"></app-municipio-select>`
        },
        {
          label: 'Estado',
          campo: 'Estado',
          template: `<app-estado-select [formControl]="form.controls['Estado']"></app-estado-select>`
        }
      ],
      endpoint: 'endereco',
      colunas: [
        { label: 'Rua', campo: 'Rua' },
        { label: 'N°', campo: 'Numero' },
        { label: 'Complemento', campo: 'Complemento' },
        { label: 'Bairro', campo: 'Bairro' },
        { label: 'CEP', campo: 'CEP' },
        { label: 'Município', campo: 'NomeMunicipio' },
        { label: 'Estado', campo: 'Estado' },
      ],
    },
    'estado': {
      titulo: 'Estados',
      campos: [
        { label: 'Estado', campo: 'NomeEstado', tipo: 'text' },
        { label: 'Sigla', campo: 'Sigla', tipo: 'text' },
      ],
      endpoint: 'estado',
      colunas: [
        { label: 'Estado', campo: 'NomeEstado' },
        { label: 'Sigla', campo: 'Sigla' },
      ],
    },
    'municipio': {
      titulo: 'Municípios',
      campos: [
        { label: 'Nome', campo: 'NomeMunicipio', tipo: 'text' },
        {
          label: 'UF',
          campo: 'IdEstado',
          tipo: 'dropdown',
          optionsEndpoint: 'estado',
          labelField: 'NomeEstado',
          valueField: 'Id',
        },
      ],
      endpoint: 'municipio',
      colunas: [
        { label: 'Nome', campo: 'NomeMunicipio' },
        { label: 'Estado', campo: 'SiglaEstado' },
      ],
    },
  };

  getConfiguracao(modelo: string) {
    const configuracao = this.configuracoes[modelo];
    if (!configuracao) {
      console.error(`Configuração para o modelo "${modelo}" não encontrada.`);
      return null;
    }
    return configuracao;
  }
}