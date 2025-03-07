import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { FindPipe } from '../../pipes/findPipe';

import { Pessoa } from '../../interface/pessoa';
import { PessoaService } from '../../../services/pessoa.service';

import { DadosPessoais } from '../../interface/dadosPessoais';
import { DadosPessoaisService } from '../../../services/dadosPessoais.service';
import { Documento } from '../../interface/documento';
import { DocumentoService } from '../../../services/documento.service';
import { Dependente } from '../../interface/dependente';
import { DependenteService } from '../../../services/dependente.service';
import { Endereco } from '../../interface/endereco';
import { EnderecoService } from '../../../services/endereco.service';
import { Contato } from '../../interface/contato';
import { ContatoService } from '../../../services/contato.service';
import { DadosTrabalho } from '../../interface/dadosTrabalho';
import { DadosTrabalhoService } from '../../../services/dadosTrabalho.service';
import { Funcao } from '../../interface/funcao';
import { FuncaoService } from '../../../services/funcao.service';
import { Conta } from '../../interface/conta';
import { ContaService } from '../../../services/conta.service';
import { Salario } from '../../interface/salario';
import { SalarioService } from '../../../services/salario.service';
import { Municipio } from '../../interface/municipio';
import { MunicipioService } from '../../../services/municipio.service';
import { Nacionalidade } from '../../interface/nacionalidade';
import { NacionalidadeService } from '../../../services/nacionalidade.service';
import { Escolaridade } from '../../interface/escolaridade';
import { EscolaridadeService } from '../../../services/escolaridade.service';
import { EstadoCivil } from '../../interface/estadoCivil';
import { EstadoCivilService } from '../../../services/estadoCivil';
import { Estado } from '../../interface/estado';
import { EstadoService } from '../../../services/estado.service';
import { Setor } from '../../interface/setor';
import { SetorService } from '../../../services/setor.service';
import { Banco } from '../../interface/banco';
import { BancoService } from '../../../services/banco.service';
import { Unidade } from '../../interface/unidade';
import { UnidadeService } from '../../../services/unidade.service';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, CheckboxModule,
    InputMaskModule, ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, StepsModule,
    DialogModule, DropdownModule, SelectModule, FindPipe],
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PessoaComponent implements OnInit {

  pessoas: Pessoa[] = [];
  pessoaLista: Pessoa[] = [];
  pessoaDialog: boolean = false;
  submitted: boolean = false;
  dadosTrabalhoDialog: boolean = false;

  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;
  step5Form!: FormGroup;
  step6Form!: FormGroup;
  step7Form!: FormGroup;
  step8Form!: FormGroup;
  step9Form!: FormGroup;
  step10Form!: FormGroup;

  pessoa: Pessoa = {
    Id: 0,
    NomePessoa: '',
    IdDadosPessoais: null,
    IdDocumentos: null,
    IdDependentes: null,
    IdEnderecos: null,
    IdContatos: null,
    IdDadosTrabalho: null,
    IdFuncoes: null,
    IdSetores: null,
    IdContas: null,
    IdSalarios: null
  }

  steps: MenuItem[] = [];
  activeIndex: number = 0;
  isSmallScreen: boolean = false;
  isAnimating = false;

  municipios: Municipio[] = [];
  nacionalidades: Nacionalidade[] = [];
  escolaridades: Escolaridade[] = [];
  estadosCivis: EstadoCivil[] = [];
  estados: Estado[] = [];
  setores: Setor[] = [];
  bancos: Banco[] = [];
  funcoes: Funcao[] = [];
  salarios: Salario[] = [];

  dadosPessoaisLista: DadosPessoais[] = [];
  documentosLista: Documento[] = [];
  dependentesLista: Dependente[] = [];
  enderecosLista: Endereco[] = [];
  contatosLista: Contato[] = [];
  dadosTrabalhoLista: DadosTrabalho[] = [];
  funcoesLista: Funcao[] = [];
  contasLista: Conta[] = [];
  salariosLista: Salario[] = [];
  municipiosLista: Municipio[] = [];
  nacionalidadesLista: Nacionalidade[] = [];
  escolaridadesLista: Escolaridade[] = [];
  estadosCivisLista: EstadoCivil[] = [];
  estadosLista: Estado[] = [];
  setoresLista: Setor[] = [];
  bancosLista: Banco[] = [];
  unidadesLista: Unidade[] = [];

  constructor(
    private pessoaService: PessoaService,
    private dadosPessoaisService: DadosPessoaisService,
    private documentoService: DocumentoService,
    private dependenteService: DependenteService,
    private enderecoService: EnderecoService,
    private contatoService: ContatoService,
    private dadosTrabalhoService: DadosTrabalhoService,
    private funcaoService: FuncaoService,
    private contaService: ContaService,
    private salarioService: SalarioService,
    private municipioService: MunicipioService,
    private nacionalidadeService: NacionalidadeService,
    private escolaridadeService: EscolaridadeService,
    private estadocivilService: EstadoCivilService,
    private estadoService: EstadoService,
    private setorService: SetorService,
    private bancoService: BancoService,
    private unidadeService: UnidadeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    this.step1Form = this.fb.group({
      nomePessoa: ['', Validators.required]
    });
    this.step2Form = this.fb.group({
      NomePai: [''],
      NomeMae: ['', Validators.required],
      IdMunicipio: [''],
      IdNacionalidade: [''],
      IdEscolaridade: [''],
      DtNascimento: ['', [Validators.required]],
      IdEstadoCivil: [''],
      NomeConjuge: ['']
    });
    this.step3Form = this.fb.group({
      CPF: ['', Validators.required],
      RG: [''],
      DtEmissaoRG: ['', [Validators.required]],
      OrgaoExpeditor: [''],
      UF_RG_IdEstado: [''],
      CTPS: [''],
      SerieCTPS: [''],
      DtEmissaoCTPS: ['', [Validators.required]],
      UF_CTPS_IdEstado: [''],
      PIS: ['']
    });
    this.step4Form = this.fb.group({
      NomeDependente: [''],
      CPF_Dependente: [''],
      DtNascimento_Dependente: ['', [Validators.required]],
    });
    this.step5Form = this.fb.group({
      Rua: ['', Validators.required],
      Numero: ['', Validators.required],
      Complemento: [''],
      Bairro: ['', Validators.required],
      IdMunicipio: ['', Validators.required],
      IdEstado: ['', Validators.required],
      CEP: ['']
    });
    this.step6Form = this.fb.group({
      Telefone: [''],
      Email: ['']
    });
    this.step7Form = this.fb.group({
      NumRegistro: [''],
      DtInicio: ['', [Validators.required]],
      DtRegistro: [''],
      Ativo: [false],
      Almoco: [false],
      Adiantamento: [false],
      ValeTransporte: [false],
      Bonifica: [false]
    });
    this.step8Form = this.fb.group({
      IdFuncao: ['', Validators.required],
      IdSetor: ['', Validators.required],
      IdUnidade: ['', Validators.required]
    });
    this.step9Form = this.fb.group({
      IdBanco: ['', Validators.required],
      Agencia: [''],
      NumConta: [''],
      PIX: ['']
    });
    this.step10Form = this.fb.group({
      Valor: ['', Validators.required],
      DtAlteracao: ['', [Validators.required]],
      SalarioAtivo: [false]
    });
  }

  ngOnInit() {
    this.loadPessoas();
    this.loadMunicipios();
    this.loadNacionalidades();
    this.loadEscolaridades();
    this.loadEstadosCivis();
    this.loadDadosPessoais();
    this.loadDocumentos();
    this.loadDependentes();
    this.loadEnderecos();
    this.loadContatos();
    this.loadDadosTrabalho();
    this.loadFuncoes();
    this.loadContas();
    this.loadSalarios();
    this.loadMunicipios();
    this.loadNacionalidades();
    this.loadEscolaridades();
    this.loadEstadosCivis();
    this.loadEstados();
    this.loadSetores();
    this.loadBancos();
    this.loadUnidades();
    this.steps = [
      { label: 'Nome', key: 'nomeCompleto' },
      { label: 'Info Pessoal', key: 'dadosPessoais' },
      { label: 'Documento', key: 'documentos' },
      { label: 'Dependente', key: 'dependentes' },
      { label: 'Endereço', key: 'enderecos' },
      { label: 'Contato', key: 'contatos' },
      { label: 'Info Trabalho', key: 'dadosTrabalho' },
      { label: 'Funções', key: 'funcoes' },
      { label: 'Contas', key: 'contas' },
      { label: 'Salários', key: 'salarios' }
    ];
  }

  mapFormToEndereco(formValue: any, idEndereco?: number): Endereco {
    return {
      Id: idEndereco || 0,
      Rua: this.titleCase(formValue.Rua),
      Numero: formValue.Numero,
      Complemento: this.titleCase(formValue.Complemento),
      Bairro: this.titleCase(formValue.Bairro),
      IdMunicipio: formValue.IdMunicipio,
      IdEstado: formValue.IdEstado,
      CEP: formValue.CEP,
      NomeMunicipio: '',
      SiglaEstado: ''
    };
  }

  titleCase(str: string): string {
    if (!str) {
      return '';
    }
    return str.toUpperCase();
  }

  formatarDataParaTela(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const isoRegex = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?Z?)?$/;
    const isoMatch = data.match(isoRegex);
    if (isoMatch) {
      const year = parseInt(isoMatch[1], 10);
      const month = parseInt(isoMatch[2], 10);
      const day = parseInt(isoMatch[3], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return `${this.padZero(day)}/${this.padZero(month)}/${year}`;
      }
    }

    const ddmmyyyyRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const ddmmyyyyMatch = data.match(ddmmyyyyRegex);
    if (ddmmyyyyMatch) {
      return data;
    }

    const timestampRegex = /^\d+$/;
    if (timestampRegex.test(data)) {
      const timestamp = parseInt(data, 10);
      if (!isNaN(timestamp)) {
        const date = new Date(timestamp);
        const day = this.padZero(date.getDate());
        const month = this.padZero(date.getMonth() + 1);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
    }

    console.error("Formato de data inválido:", data);
    return data;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  formatarDataParaBanco(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const regexYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
    if (regexYYYYMMDD.test(data)) {
      return data;
    }

    const parts = data.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    console.error("Formato de data inválido para envio ao banco:", data);
    return data;
  }

  loadPessoas() {
    this.pessoaService.getPessoas().subscribe({
      next: (data) => {
        this.pessoas = data;
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);

        let errorMessage = 'Erro ao carregar dados';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage });
      }
    });
  }

  loadDadosPessoais() {
    this.dadosPessoaisService.getDadosPessoais().subscribe({
      next: (data) => {
        this.dadosPessoaisLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadDocumentos() {
    this.documentoService.getDocumentos().subscribe({
      next: (data) => {
        this.documentosLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadDependentes() {
    this.dependenteService.getDependentes().subscribe({
      next: (data) => {
        this.dependentesLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadEnderecos() {
    this.enderecoService.getEnderecos().subscribe({
      next: (data) => {
        this.enderecosLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadContatos() {
    this.contatoService.getContatos().subscribe({
      next: (data) => {
        this.contatosLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadDadosTrabalho() {
    this.dadosTrabalhoService.getDadosTrabalhos().subscribe({
      next: (data) => {
        this.dadosTrabalhoLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadFuncoes() {
    this.funcaoService.getFuncoes().subscribe({
      next: (data) => {
        this.funcoesLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadContas() {
    this.contaService.getContas().subscribe({
      next: (data) => {
        this.contasLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadSalarios() {
    this.salarioService.getSalarios().subscribe({
      next: (data) => {
        this.salariosLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadMunicipios() {
    this.municipioService.getMunicipios().subscribe({
      next: (data) => {
        this.municipiosLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadNacionalidades() {
    this.nacionalidadeService.getNacionalidades().subscribe({
      next: (data) => {
        this.nacionalidadesLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadEscolaridades() {
    this.escolaridadeService.getEscolaridades().subscribe({
      next: (data) => {
        this.escolaridadesLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadEstadosCivis() {
    this.estadocivilService.getEstadosCivis().subscribe({
      next: (data) => {
        this.estadosCivisLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadEstados() {
    this.estadoService.getEstados().subscribe({
      next: (data) => {
        this.estadosLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadSetores() {
    this.setorService.getSetores().subscribe({
      next: (data) => {
        this.setoresLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadBancos() {
    this.bancoService.getBancos().subscribe({
      next: (data) => {
        this.bancosLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  loadUnidades() {
    this.unidadeService.getUnidades().subscribe({
      next: (data) => {
        this.unidadesLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  openNew() {
    this.step1Form.reset();
    this.step2Form.reset();
    this.step3Form.reset();
    this.step4Form.reset();
    this.step5Form.reset();
    this.step6Form.reset();
    this.step7Form.reset();
    this.step8Form.reset();
    this.step9Form.reset();
    this.step10Form.reset();
    this.submitted = false;
    this.pessoaDialog = true;
    this.activeIndex = 0;
  }

  async savePessoa() {
    this.submitted = true;

    if (this.step1Form.valid && this.step2Form.valid && this.step3Form.valid && this.step4Form.valid && this.step5Form.valid && this.step6Form.valid && this.step7Form.valid && this.step8Form.valid && this.step9Form.valid && this.step10Form.valid) {
      try {
        const dadosPessoaisId = await this.salvarDadosPessoais(this.step2Form.value, this.pessoa.IdDadosPessoais as number | undefined);
        const documentosId = await this.salvarDocumentos(this.step3Form.value, this.pessoa.IdDocumentos as number | undefined);
        const dependentesId = await this.salvarDependentes(this.step4Form.value, this.pessoa.IdDependentes as number | undefined);
        const enderecoId = await this.salvarEndereco(this.step5Form.value, this.pessoa.IdEnderecos as number | undefined);
        const contatosId = await this.salvarContatos(this.step6Form.value, this.pessoa.IdContatos as number | undefined);
        const dadosTrabalhoId = await this.salvarDadosTrabalho(this.step7Form.value, this.pessoa.IdDadosTrabalho as number | undefined);
        const funcaoId = this.step8Form.get('IdFuncao')?.value;
        const setorId = this.step8Form.get('IdSetor')?.value;
        const unidadeId = this.step8Form.get('IdUnidade')?.value;
        const contasId = await this.salvarContas(this.step9Form.value, this.pessoa.IdContas as number | undefined);
        const salariosId = await this.salvarSalarios(this.step10Form.value, this.pessoa.IdSalarios as number | undefined);

        const pessoaData: Pessoa = {
          Id: this.pessoa.Id || 0,
          NomePessoa: this.titleCase(this.step1Form.get('nomePessoa')?.value),
          IdDadosPessoais: dadosPessoaisId,
          IdDocumentos: documentosId,
          IdDependentes: dependentesId,
          IdEnderecos: enderecoId,
          IdContatos: contatosId,
          IdDadosTrabalho: dadosTrabalhoId,
          IdFuncoes: funcaoId,
          IdSetores: setorId,
          IdUnidades: unidadeId,
          IdContas: contasId,
          IdSalarios: salariosId
        };

        if (this.pessoa.Id) {
          this.pessoaService.updatePessoa(this.pessoa.Id, pessoaData).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa atualizada com sucesso' });
              this.loadPessoas();
              this.pessoaDialog = false;
            },
            error: (err) => {
              console.error('Erro ao atualizar pessoa:', err);
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar pessoa' });
            }
          });
        } else {
          this.pessoaService.addPessoa(pessoaData).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Pessoa criada com sucesso' });
              this.loadPessoas();
              this.pessoaDialog = false;
            },
            error: (err) => {
              console.error('Erro ao criar pessoa:', err);
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar pessoa' });
            }
          });
        }
      } catch (error) {
        console.error('Erro no salvamento:', error);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar dados' });
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos corretamente', life: 3000 });
    }
  }

  async salvarDadosPessoais(dados: any, idDadosPessoais?: number): Promise<number> {
    const dadosFormatados = {
      ...dados,
      Id: idDadosPessoais,
      NomePai: this.titleCase(dados.NomePai),
      NomeMae: this.titleCase(dados.NomeMae),
      NomeConjuge: this.titleCase(dados.NomeConjuge),
      DtNascimento: this.formatarDataParaBanco(dados.DtNascimento)
    };

    return new Promise((resolve, reject) => {
      const serviceCall = idDadosPessoais
        ? this.dadosPessoaisService.updateDadosPessoais(idDadosPessoais, dadosFormatados)
        : this.dadosPessoaisService.addDadosPessoais(dadosFormatados);

      serviceCall.subscribe({
        next: (response: any) => {
          const id = idDadosPessoais || (response && response.Id);
          if (id) {
            resolve(id);
          } else {
            reject(new Error('ID não encontrado na resposta de salvarDadosPessoais'));
          }
        },
        error: (err) => {
          console.error('Erro em salvarDadosPessoais:', err);
          reject(err);
        }
      });
    });
  }

  async salvarDocumentos(documentos: any, idDocumentos?: number): Promise<number> {
    const documentosFormatados = {
      ...documentos,
      Id: idDocumentos,
      DtEmissaoRG: this.formatarDataParaBanco(documentos.DtEmissaoRG),
      DtEmissaoCTPS: this.formatarDataParaBanco(documentos.DtEmissaoCTPS),
      OrgaoExpeditor: this.titleCase(documentos.OrgaoExpeditor)
    };

    return new Promise((resolve, reject) => {
      const serviceCall = idDocumentos
        ? this.documentoService.updateDocumento(idDocumentos, documentosFormatados)
        : this.documentoService.addDocumento(documentosFormatados);

      serviceCall.subscribe({
        next: (response: any) => {
          const id = idDocumentos || (response && response.Id);
          if (id) {
            resolve(id);
          } else {
            reject(new Error('ID não encontrado na resposta de salvarDocumentos'));
          }
        },
        error: (err) => {
          console.error('Erro em salvarDocumentos:', err);
          reject(err);
        }
      });
    });
  }

  async salvarDependentes(dependentes: any, idDependentes?: number): Promise<number> {
    const dependentesFormatados = {
      ...dependentes,
      Id: idDependentes,
      NomeDependente: this.titleCase(dependentes.NomeDependente),
      DtNascimento_Dependente: this.formatarDataParaBanco(dependentes.DtNascimento_Dependente)
    };

    return new Promise((resolve, reject) => {
      const serviceCall = idDependentes
        ? this.dependenteService.updateDependente(idDependentes, dependentesFormatados)
        : this.dependenteService.addDependente(dependentesFormatados);

      serviceCall.subscribe({
        next: (response: any) => {
          const id = idDependentes || (response && response.Id);
          if (id) {
            resolve(id);
          } else {
            reject(new Error('ID não encontrado na resposta de salvarDependentes'));
          }
        },
        error: (err) => {
          console.error('Erro em salvarDependentes:', err);
          reject(err);
        }
      });
    });
  }

  async salvarEndereco(endereco: any, idEndereco?: number): Promise<number> {
    const enderecoFormatado = this.mapFormToEndereco(endereco, idEndereco);

    return new Promise((resolve, reject) => {
      const serviceCall = idEndereco
        ? this.enderecoService.updateEndereco(idEndereco, enderecoFormatado)
        : this.enderecoService.addEndereco(enderecoFormatado);

      serviceCall.subscribe({
        next: (response: any) => {
          const id = idEndereco || (response && response.Id);
          if (id) {
            resolve(id);
          } else {
            reject(new Error('ID não encontrado na resposta de salvarEndereco'));
          }
        },
        error: (err) => {
          console.error('Erro em salvarEndereco:', err);
          reject(err);
        }
      });
    });
  }

  async salvarContatos(contatos: any, idContatos?: number): Promise<number> {
    const contatosFormatados = {
      ...contatos,
      Id: idContatos
    };

    return new Promise((resolve, reject) => {
      const serviceCall = idContatos
        ? this.contatoService.updateContato(idContatos, contatosFormatados)
        : this.contatoService.addContato(contatosFormatados);

      serviceCall.subscribe({
        next: (response: any) => {
          const id = idContatos || (response && response.Id);
          if (id) {
            resolve(id);
          } else {
            reject(new Error('ID não encontrado na resposta de salvarContatos'));
          }
        },
        error: (err) => {
          console.error('Erro em salvarContatos:', err);
          reject(err);
        }
      });
    });
  }

  async salvarDadosTrabalho(dadosTrabalho: any, idDadosTrabalho?: number): Promise<number> {
    const dadosTrabalhoFormatados = {
      ...dadosTrabalho,
      Id: idDadosTrabalho,
      DtInicio: this.formatarDataParaBanco(dadosTrabalho.DtInicio),
      DtRegistro: this.formatarDataParaBanco(dadosTrabalho.DtRegistro)
    };

    return new Promise((resolve, reject) => {
      const serviceCall = idDadosTrabalho
        ? this.dadosTrabalhoService.updateDadosTrabalho(idDadosTrabalho, dadosTrabalhoFormatados)
        : this.dadosTrabalhoService.addDadosTrabalho(dadosTrabalhoFormatados);

      serviceCall.subscribe({
        next: (response: any) => {
          const id = idDadosTrabalho || (response && response.Id);
          if (id) {
            resolve(id);
          } else {
            reject(new Error('ID não encontrado na resposta de salvarDadosTrabalho'));
          }
        },
        error: (err) => {
          console.error('Erro em salvarDadosTrabalho:', err);
          reject(err);
        }
      });
    });
  }

  async salvarContas(contas: any, idContas?: number): Promise<number> {
    const contasFormatadas = {
      ...contas,
      Id: idContas
    };

    return new Promise((resolve, reject) => {
      const serviceCall = idContas
        ? this.contaService.updateConta(idContas, contasFormatadas)
        : this.contaService.addConta(contasFormatadas);

      serviceCall.subscribe({
        next: (response: any) => {
          const id = idContas || (response && response.Id);
          if (id) {
            resolve(id);
          } else {
            reject(new Error('ID não encontrado na resposta de salvarContas'));
          }
        },
        error: (err) => {
          console.error('Erro em salvarContas:', err);
          reject(err);
        }
      });
    });
  }

  async salvarSalarios(salarios: any, idSalarios?: number): Promise<number> {
    const salariosFormatados = {
      ...salarios,
      Id: idSalarios,
      DtAlteracao: this.formatarDataParaBanco(salarios.DtAlteracao)
    };

    return new Promise((resolve, reject) => {
      const serviceCall = idSalarios
        ? this.salarioService.updateSalario(idSalarios, salariosFormatados)
        : this.salarioService.addSalario(salariosFormatados);

      serviceCall.subscribe({
        next: (response: any) => {
          const id = idSalarios || (response && response.Id);
          if (id) {
            resolve(id);
          } else {
            reject(new Error('ID não encontrado na resposta de salvarSalarios'));
          }
        },
        error: (err) => {
          console.error('Erro em salvarSalarios:', err);
          reject(err);
        }
      });
    });
  }

  editPessoa(pessoa: Pessoa) {
    this.pessoaDialog = true;
    this.pessoa = { ...pessoa };

    this.step1Form.patchValue({
      nomePessoa: pessoa.NomePessoa
    });
    this.carregarDadosDependente(pessoa);
  }

  async carregarDadosDependente(pessoa: Pessoa) {
    if (pessoa.IdDadosPessoais) {
      this.dadosPessoaisService.getDadosPessoaisById(pessoa.IdDadosPessoais).subscribe({
        next: (dadosPessoais) => {
          this.step2Form.patchValue({
            NomePai: dadosPessoais.NomePai,
            NomeMae: dadosPessoais.NomeMae,
            NomeConjuge: dadosPessoais.NomeConjuge,
            DtNascimento: this.formatarDataParaTela(dadosPessoais.DtNascimento),
            IdMunicipio: dadosPessoais.IdMunicipio,
            IdNacionalidade: dadosPessoais.IdNacionalidade,
            IdEstadoCivil: dadosPessoais.IdEstadoCivil,
            IdEscolaridade: dadosPessoais.IdEscolaridade
          });
          this.pessoa.IdDadosPessoais = pessoa.IdDadosPessoais;
        },
        error: (err) => {
          console.error('Erro ao carregar Dados Pessoais:', err);
        }
      });
    }

    if (pessoa.IdDocumentos) {
      this.documentoService.getDocumentoById(pessoa.IdDocumentos).subscribe({
        next: (documentos) => {
          this.step3Form.patchValue({
            DtEmissaoRG: this.formatarDataParaTela(documentos.DtEmissaoRG),
            DtEmissaoCTPS: this.formatarDataParaTela(documentos.DtEmissaoCTPS),
            OrgaoExpeditor: documentos.OrgaoExpeditor,
            CPF: documentos.CPF,
            RG: documentos.RG,
            UF_RG_IdEstado: documentos.UF_RG_IdEstado,
            UF_CTPS_IdEstado: documentos.UF_CTPS_IdEstado,
            CTPS: documentos.CTPS,
            SerieCTPS: documentos.SerieCTPS,
            PIS: documentos.PIS
          });
          this.pessoa.IdDocumentos = pessoa.IdDocumentos;
        },
        error: (err) => {
          console.error('Erro ao carregar Documentos:', err);
        }
      });
    }

    if (pessoa.IdDependentes) {
      this.dependenteService.getDependenteById(pessoa.IdDependentes).subscribe({
        next: (dependentes) => {
          this.step4Form.patchValue({
            NomeDependente: dependentes.NomeDependente,
            DtNascimento_Dependente: this.formatarDataParaTela(dependentes.DtNascimento_Dependente),
            CPF_Dependente: dependentes.CPF_Dependente
          });
          this.pessoa.IdDependentes = pessoa.IdDependentes;
        },
        error: (err) => {
          console.error('Erro ao carregar Dependentes:', err);
        }
      });
    }

    if (pessoa.IdEnderecos) {
      this.enderecoService.getEnderecoById(pessoa.IdEnderecos).subscribe({
        next: (endereco) => {
          this.step5Form.patchValue({
            Rua: endereco.Rua,
            Complemento: endereco.Complemento,
            Bairro: endereco.Bairro,
            IdMunicipio: endereco.IdMunicipio,
            IdEstado: endereco.IdEstado,
            Numero: endereco.Numero,
            CEP: endereco.CEP
          });
          this.pessoa.IdEnderecos = pessoa.IdEnderecos;
        },
        error: (err) => {
          console.error('Erro ao carregar Endereço:', err);
        }
      });
    }

    if (pessoa.IdContatos) {
      this.contatoService.getContatoById(pessoa.IdContatos).subscribe({
        next: (contatos) => {
          this.step6Form.patchValue({
            Telefone: contatos.Telefone,
            Email: contatos.Email
          });
          this.pessoa.IdContatos = pessoa.IdContatos;
        },
        error: (err) => {
          console.error('Erro ao carregar Contatos:', err);
        }
      });
    }

    if (pessoa.IdDadosTrabalho) {
      this.dadosTrabalhoService.getDadosTrabalhoById(pessoa.IdDadosTrabalho).subscribe({
        next: (dadosTrabalho) => {
          this.step7Form.patchValue({
            DtInicio: this.formatarDataParaTela(dadosTrabalho.DtInicio),
            DtRegistro: this.formatarDataParaTela(dadosTrabalho.DtRegistro),
            NumRegistro: dadosTrabalho.NumRegistro,
            Ativo: dadosTrabalho.Ativo,
            Almoco: dadosTrabalho.Almoco,
            Adiantamento: dadosTrabalho.Adiantamento,
            ValeTransporte: dadosTrabalho.ValeTransporte,
            Bonifica: dadosTrabalho.Bonifica
          });
          this.pessoa.IdDadosTrabalho = pessoa.IdDadosTrabalho;
        },
        error: (err) => {
          console.error('Erro ao carregar Dados de Trabalho:', err);
        }
      });
    }

    this.step8Form.patchValue({
      IdFuncao: pessoa.IdFuncoes,
      IdSetor: pessoa.IdSetores,
      IdUnidade: pessoa.IdUnidades
    });

    if (pessoa.IdContas) {
      this.contaService.getContaById(pessoa.IdContas).subscribe({
        next: (contas) => {
          this.step9Form.patchValue({
            Agencia: contas.Agencia,
            NumConta: contas.NumConta,
            IdBanco: contas.IdBanco,
            PIX: contas.PIX
          });
          this.pessoa.IdContas = pessoa.IdContas;
        },
        error: (err) => {
          console.error('Erro ao carregar Contas:', err);
        }
      });
    }

    if (pessoa.IdSalarios) {
      this.salarioService.getSalarioById(pessoa.IdSalarios).subscribe({
        next: (salarios) => {
          this.step10Form.patchValue({
            Valor: salarios.Valor,
            DtAlteracao: this.formatarDataParaTela(salarios.DtAlteracao),
            SalarioAtivo: salarios.SalarioAtivo
          });
          this.pessoa.IdSalarios = pessoa.IdSalarios;
        },
        error: (err) => {
          console.error('Erro ao carregar Salários:', err);
        }
      });
    }
  }

  deletePessoa(pessoa: Pessoa) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + pessoa.NomePessoa + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pessoaService.deletePessoa(pessoa.Id).subscribe({
          next: () => {
            this.pessoaLista = this.pessoaLista.filter(val => val.Id !== pessoa.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Registro Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o registro ' + pessoa.NomePessoa, life: 3000 });
            console.error('Erro ao deletar registro:', error);
          }
        });
      }
    });
  }

  nextPage() {
    let currentFormValid = false;

    switch (this.activeIndex) {
      case 0:
        currentFormValid = this.step1Form.valid;
        break;
      case 1:
        currentFormValid = this.step2Form.valid;
        break;
      case 2:
        currentFormValid = this.step3Form.valid;
        break;
      case 3:
        currentFormValid = this.step4Form.valid;
        break;
      case 4:
        currentFormValid = this.step5Form.valid;
        break;
      case 5:
        currentFormValid = this.step6Form.valid;
        break;
      case 6:
        currentFormValid = this.step7Form.valid;
        break;
      case 7:
        currentFormValid = this.step8Form.valid;
        break;
      case 8:
        currentFormValid = this.step9Form.valid;
        break;
      case 9:
        currentFormValid = this.step10Form.valid;
        break;
    }
    this.activeIndex++;
  }

  prevPage() {
    this.activeIndex = this.activeIndex - 1;
  }
}