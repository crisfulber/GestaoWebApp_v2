import { Injectable } from '@angular/core';

export interface CampoConfig {
  label: string;
  campo: string;
  tipo?: string;
  optionsEndpoint?: string;
  labelField?: string;
  valueField?: string;
  concatFields?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configuracoes: { [key: string]: any } = {
    'Contato': {
      titulo: 'Contatos',
      campos: [
        { label: 'Telefone', campo: 'telefone', tipo: 'text' },
        { label: 'Email', campo: 'email', tipo: 'text' },
      ],
      endpoint: 'Contato',
      colunas: [
        { label: 'Telefone', campo: 'telefone', },
        { label: 'Email', campo: 'email', },
      ],
    },
    'Empresa': {
      titulo: 'Empresas',
      campos: [
        { label: 'Empresa', campo: 'NomeEmpresa', tipo: 'text' },
        { label: 'Rua', campo: 'EnderecoRua', tipo: 'text' },
        { label: 'Número', campo: 'EnderecoNumero', tipo: 'text' },
        { label: 'Complemento', campo: 'EnderecoComplemento', tipo: 'text' },
        { label: 'Bairro', campo: 'EnderecoBairro', tipo: 'text' },
        { label: 'CEP', campo: 'EnderecoCEP', tipo: 'text' },
        {
          label: 'Município',
          campo: 'Id',
          tipo: 'select',
          optionsEndpoint: 'Municipio',
          labelField: 'NomeMunicipio',
          valueField: 'Id'
        },
      ],
      endpoint: 'Empresa',
      colunas: [
        { label: 'Nome', campo: 'NomeEmpresa' },
        { label: 'Rua', campo: 'EnderecoRua' },
        { label: 'Número', campo: 'EnderecoNumero' },
        { label: 'Complemento', campo: 'EnderecoComplemento' },
        { label: 'Bairro', campo: 'EnderecoBairro' },
        { label: 'CEP', campo: 'EnderecoCEP' },
        { label: 'Município', campo: 'EnderecoNomeMunicipio' }
      ],
    },
    'Endereco': {
      titulo: 'Endereços',
      campos: [
        { label: 'Rua', campo: 'Rua', tipo: 'text' },
        { label: 'N°', campo: 'numero', tipo: 'number' },
        { label: 'Complemento', campo: 'Complemento', tipo: 'text' },
        { label: 'Bairro', campo: 'Bairro', tipo: 'text' },
        { label: 'CEP', campo: 'CEP', tipo: 'text' },
        {
          label: 'Município',
          campo: 'NomeMunicipio',
          tipo: 'select',
          optionsEndpoint: 'Municipio',
          labelField: 'nomeMunicipio',
          valueField: 'Id',
          concatFields: ['municipio']
        },
      ],
      endpoint: 'Endereco',
      colunas: [
        { label: 'Rua', campo: 'Rua' },
        { label: 'N°', campo: 'Numero', tipo: 'number' },
        { label: 'Complemento', campo: 'Complemento', tipo: 'text' },
        { label: 'Bairro', campo: 'Bairro', tipo: 'text' },
        { label: 'CEP', campo: 'CEP', tipo: 'text' },
        { label: 'Município', campo: 'NomeMunicipio', tipo: 'text' },
      ],
    },
    'estado': {
      titulo: 'Estados',
      campos: [
        { label: 'Estado', campo: 'nomeEstado', tipo: 'text' },
        { label: 'Sigla', campo: 'sigla', tipo: 'text' },
      ],
      endpoint: 'estado',
      colunas: [
        { label: 'Estado', campo: 'nomeEstado' },
        { label: 'Sigla', campo: 'sigla' },
      ],
    },
    'Municipio': {
      titulo: 'Municípios',
      campos: [
        { label: 'Nome', campo: 'NomeMunicipio', tipo: 'text' },
        {
          label: 'UF',
          campo: 'SiglaEstado',
          tipo: 'select',
          optionsEndpoint: 'Estado',
          labelField: 'NomeEstado',
          valueField: 'Id',
          concatFields: ['Sigla']
        },
      ],
      endpoint: 'Municipio',
      colunas: [
        { label: 'Nome', campo: 'nomeMunicipio', tipo: 'text' },
        { label: 'Estado', campo: 'SiglaEstado', tipo: 'text' },
      ],
    },
    'Setor': {
      titulo: 'Setores',
      campos: [
        { label: 'Nome', campo: 'NomeSetor', tipo: 'text' },
        {
          label: 'Unidade',
          campo: 'Unidade',
          tipo: 'select',
          optionsEndpoint: 'Unidade',
          labelField: 'NomeUnidade',
          valueField: 'Id'
        }
      ],
      endpoint: 'Setor',
      colunas: [
        { label: 'Nome', campo: 'NomeSetor' },
        { label: 'Unidade', campo: 'NomeUnidade' },
      ],
    },
    'Unidade': {
      titulo: 'Unidades',
      campos: [
        { label: 'Nome', campo: 'NomeUnidade', tipo: 'text' },
        { label: 'Rua', campo: 'EnderecoRua', tipo: 'text' },
        { label: 'Número', campo: 'EnderecoNumero', tipo: 'text' },
        { label: 'Complemento', campo: 'EnderecoComplemento', tipo: 'text' },
        { label: 'Bairro', campo: 'EnderecoBairro', tipo: 'text' },
        { label: 'CEP', campo: 'EnderecoCEP', tipo: 'text' },
        {
          label: 'Município',
          campo: 'EnderecoMunicipio',
          tipo: 'select',
          optionsEndpoint: 'Municipio',
          labelField: 'NomeMunicipio',
          valueField: 'Id'
        },
        {
          label: 'Empresa',
          campo: 'NomeEmpresa',
          tipo: 'select',
          optionsEndpoint: 'Empresa',
          labelField: 'NomeEmpresa',
          valueField: 'Id'
        }
      ],
      endpoint: 'Unidade',
      colunas: [
        { label: 'Nome', campo: 'NomeUnidade' },
        { label: 'Empresa', campo: 'NomeEmpresa' },
        { label: 'Rua', campo: 'EnderecoRua' },
        { label: 'Número', campo: 'EnderecoNumero' },
        { label: 'Complemento', campo: 'EnderecoComplemento' },
        { label: 'Bairro', campo: 'EnderecoBairro' },
        { label: 'CEP', campo: 'EnderecoCEP' },
        { label: 'Município', campo: 'EnderecoNomeMunicipio' },
      ],
    },
  };

  getConfiguracao(modelo: string) {
    console.log('Modelo recebido em getConfiguracao:', modelo);
    const configuracao = this.configuracoes[modelo];
    if (!configuracao) {
      console.error(`Configuração para o modelo "${modelo}" não encontrada.`);
      return null;
    }
    return configuracao;
  }
}