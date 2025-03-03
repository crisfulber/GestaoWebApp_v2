import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../../services/pessoa.service';
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
import { Pessoa } from '../../interface/pessoa';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

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

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, CheckboxModule,
    InputMaskModule, ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, StepsModule,
    DialogModule, DropdownModule],
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
    IdContas: null,
    IdSalarios: null
  }

  steps: MenuItem[] = [];
  activeIndex: number = 0;

  municipios: Municipio[] = [];
  nacionalidades: Nacionalidade[] = [];
  escolaridades: Escolaridade[] = [];
  estadosCivis: EstadoCivil[] = [];
  estados: Estado[] = [];
  setores: Setor[] = [];
  bancos: Banco[] = [];
  funcoes: Funcao[] = [];

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
      DtNascimento: ['', Validators.required],
      IdEstadoCivil: [''],
      NomeConjuge: ['']
    });
    this.step3Form = this.fb.group({
      CPF: ['', Validators.required],
      RG: [''],
      DtEmissaoRG: [''],
      OrgaoExpeditor: [''],
      UF_RG: [''],
      CTPS: [''],
      SerieCTPS: [''],
      DtEmissaoCTPS: [''],
      UF_CTPS: [''],
      PIS: ['']
    });
    this.step4Form = this.fb.group({
      NomeDependente: [''],
      CPF_Dependente: [''],
      DtNascimento_Dependente: ['']
    });
    this.step5Form = this.fb.group({
      Rua: ['', Validators.required],
      Numero: ['', Validators.required],
      Complemento: [''],
      Bairro: ['', Validators.required],
      IdMunicipio_Endereco: ['', Validators.required],
      IdEstado_Endereco: ['', Validators.required],
      CEP: ['']
    });
    this.step6Form = this.fb.group({
      Telefone: [''],
      Email: ['']
    });
    this.step7Form = this.fb.group({
      NumRegistro: [''],
      DtInicio: ['', Validators.required],
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
    });
    this.step9Form = this.fb.group({
      IdBanco: [''],
      Agencia: [''],
      NumConta: [''],
      PIX: [''],
      Valor: ['', Validators.required],
      DtAlteracao: ['', Validators.required],
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
    this.loadMunicipios();
    this.loadNacionalidades();
    this.loadEscolaridades();
    this.loadEstadosCivis();
    this.loadEstados();
    this.loadSetores();
    this.loadBancos();
    this.steps = [
      { label: 'Dados Pessoais' },
      { label: 'Documentos' },
      { label: 'Dependentes' },
      { label: 'Endereços' },
      { label: 'Contatos' },
      { label: 'Dados Trabalho' },
      { label: 'Funções' },
      { label: 'Contas' },
      { label: 'Salários' }
    ];
  }

  titleCase(str: string): string {
    if (!str) {
      return '';
    }
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
    this.submitted = false;
    this.pessoaDialog = true;
    this.activeIndex = 0;
  }

  // Função para mapear o objeto do formulário para o tipo Endereco
  mapFormToEndereco(formValue: any): Endereco {
    return {
      Id: 0, // Ou o valor correto, se você já tiver um ID existente
      Rua: this.titleCase(formValue.Rua),
      Numero: this.titleCase(formValue.Numero),
      Complemento: this.titleCase(formValue.Complemento),
      Bairro: this.titleCase(formValue.Bairro),
      IdMunicipio: formValue.IdMunicipio_Endereco,
      IdEstado: formValue.IdEstado_Endereco,
      CEP: formValue.CEP
    };
  }

  savePessoa() {
    console.log('savePessoa() foi chamado!');
    this.submitted = true;

    const formIsValid = this.step1Form.valid &&
      this.step2Form.valid &&
      this.step3Form.valid &&
      this.step4Form.valid &&
      this.step5Form.valid &&
      this.step6Form.valid &&
      this.step7Form.valid &&
      this.step8Form.valid &&
      this.step9Form.valid;

    console.log('Formulário é válido:', formIsValid);

    if (formIsValid) {
      console.log('step1Form:', this.step1Form.value);
      console.log('step2Form:', this.step2Form.value);
      console.log('step3Form:', this.step3Form.value);
      console.log('step4Form:', this.step4Form.value);
      console.log('step5Form:', this.step5Form.value);
      console.log('step6Form:', this.step6Form.value);
      console.log('step7Form:', this.step7Form.value);
      console.log('step8Form:', this.step8Form.value);
      console.log('step9Form:', this.step9Form.value);

      const nomePessoa = this.titleCase(this.step1Form.get('nomePessoa')?.value);
      const dadosPessoais = this.step2Form.value;
      const documentos = this.step3Form.value;
      const dependentes = this.step4Form.value;

      //Formatando Endereço
      const enderecos = this.step5Form.value;
      const enderecosFormatados: Endereco = this.mapFormToEndereco(enderecos);
      console.log('enderecosFormatados:', enderecosFormatados);

      const contatos = this.step6Form.value;
      const dadosTrabalho = this.step7Form.value;
      const funcoes = this.step8Form.value;
      const contas = this.step9Form.value;
      const salarios = this.step9Form.value;

      const pessoaData = {
        NomePessoa: nomePessoa,
        DadosPessoais: dadosPessoais,
        Documentos: documentos,
        Dependentes: dependentes,
        Enderecos: enderecosFormatados,
        Contatos: contatos,
        DadosTrabalho: dadosTrabalho,
        Funcoes: funcoes,
        Contas: contas,
        Salarios: salarios
      };

      this.dadosPessoaisService.addDadosPessoais(pessoaData.DadosPessoais).subscribe({
        next: (dadosPessoaisResponse) => {
          console.log('dadosPessoaisService.addDadosPessoais() chamado com sucesso:', dadosPessoaisResponse);
          const idDadosPessoais = dadosPessoaisResponse.Id;

          this.documentoService.addDocumento(pessoaData.Documentos).subscribe({
            next: (documentoResponse) => {
              console.log('documentoService.addDocumento() chamado com sucesso:', documentoResponse);
              const idDocumentos = documentoResponse.Id;

              this.dependenteService.addDependente(pessoaData.Dependentes).subscribe({
                next: (dependenteResponse) => {
                  console.log('dependenteService.addDependente() chamado com sucesso:', dependenteResponse);
                  const idDependentes = dependenteResponse.Id;

                  this.enderecoService.addEndereco(pessoaData.Enderecos).subscribe({
                    next: (enderecoResponse) => {
                      console.log('enderecoService.addEndereco() chamado com sucesso:', enderecoResponse);
                      const idEnderecos = enderecoResponse.Id;

                      this.contatoService.addContato(pessoaData.Contatos).subscribe({
                        next: (contatoResponse) => {
                          console.log('contatoService.addContato() chamado com sucesso:', contatoResponse);
                          const idContatos = contatoResponse.Id;

                          this.dadosTrabalhoService.addDadosTrabalho(pessoaData.DadosTrabalho).subscribe({
                            next: (dadosTrabalhoResponse) => {
                              console.log('dadosTrabalhoService.addDadosTrabalho() chamado com sucesso:', dadosTrabalhoResponse);
                              const idDadosTrabalho = dadosTrabalhoResponse.Id;

                              this.funcaoService.addFuncao(pessoaData.Funcoes).subscribe({
                                next: (funcaoResponse) => {
                                  console.log('funcaoService.addFuncao() chamado com sucesso:', funcaoResponse);
                                  const idFuncoes = funcaoResponse.Id;

                                  this.contaService.addConta(pessoaData.Contas).subscribe({
                                    next: (contaResponse) => {
                                      console.log('contaService.addConta() chamado com sucesso:', contaResponse);
                                      const idContas = contaResponse.Id;

                                      this.salarioService.addSalario(pessoaData.Salarios).subscribe({
                                        next: (salarioResponse) => {
                                          console.log('salarioService.addSalario() chamado com sucesso:', salarioResponse);
                                          const idSalarios = salarioResponse.Id;

                                          const pessoa: Pessoa = {
                                            Id: 0,
                                            NomePessoa: pessoaData.NomePessoa,
                                            IdDadosPessoais: idDadosPessoais,
                                            IdDocumentos: idDocumentos,
                                            IdDependentes: idDependentes,
                                            IdEnderecos: idEnderecos,
                                            IdContatos: idContatos,
                                            IdDadosTrabalho: idDadosTrabalho,
                                            IdFuncoes: idFuncoes,
                                            IdContas: idContas,
                                            IdSalarios: idSalarios
                                          };

                                          this.pessoaService.addPessoa(pessoa).subscribe({
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
                                        },
                                        error: (err) => {
                                          console.error('Erro ao criar salário:', err);
                                          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar salário' });
                                        }
                                      });
                                    },
                                    error: (err) => {
                                      console.error('Erro ao criar conta:', err);
                                      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar conta' });
                                    }
                                  });
                                },
                                error: (err) => {
                                  console.error('Erro ao criar função:', err);
                                  this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar função' });
                                }
                              });
                            },
                            error: (err) => {
                              console.error('Erro ao criar dadosTrabalho:', err);
                              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar dadosTrabalho' });
                            }
                          });
                        },
                        error: (err) => {
                          console.error('Erro ao criar contato:', err);
                          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar contato' });
                        }
                      });
                    },
                    error: (err) => {
                      console.error('Erro ao criar endereço:', err);
                      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar endereço' });
                    }
                  });
                },
                error: (err) => {
                  console.error('Erro ao criar dependente:', err);
                  this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar dependente' });
                }
              });
            },
            error: (err) => {
              console.error('Erro ao criar documento:', err);
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar documento' });
            }
          });
        },
        error: (err) => {
          console.error('Erro ao criar dados pessoais:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar dados pessoais' });
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos corretamente', life: 3000 });
    }

    this.dadosTrabalhoDialog = false;
    this.loadPessoas();
  }

  editPessoa(pessoa: Pessoa) {
    this.pessoaDialog = true;
    this.pessoa = { ...pessoa };
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
    }
    console.log('is currenct form valid:' + currentFormValid)
    if (currentFormValid) {
      this.activeIndex++;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha todos os campos corretamente', life: 3000 });
    }
  }

  prevPage() {
    this.activeIndex = this.activeIndex - 1;
  }
}