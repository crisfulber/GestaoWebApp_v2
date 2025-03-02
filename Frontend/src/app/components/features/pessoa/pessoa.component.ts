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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
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
  pessoaForm!: FormGroup;
  submitted: boolean = false;
  dadosTrabalhoDialog: boolean = false;
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
  formSteps: FormGroup[] = [];

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
    this.formSteps = [
      this.fb.group({
        nomePessoa: ['', Validators.required]
      }),
      this.fb.group({
        NomePai: [''],
        NomeMae: ['', Validators.required],
        IdMunicipio: [''],
        IdNacionalidade: ['', Validators.required],
        IdEscolaridade: [''],
        DtNascimento: ['', Validators.required],
        IdEstadoCivil: [''],
        NomeConjuge: ['']
      }),
      this.fb.group({
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
      }),
      this.fb.group({
        NomeDependente: [''],
        CPF: [''],
        DtNascimento: ['']
      }),
      this.fb.group({
        Rua: ['', Validators.required],
        Numero: ['', Validators.required],
        Complemento: [''],
        Bairro: ['', Validators.required],
        IdMunicipio: ['', Validators.required],
        IdEstado: ['', Validators.required],
        CEP: ['']
      }),
      this.fb.group({
        Telefone: [''],
        Email: ['']
      }),
      this.fb.group({
        NumRegistro: [''],
        Dtinicio: ['', Validators.required],
        DtRegistro: [''],
        Ativo: ['', Validators.required],
        Almoco: ['', Validators.required],
        Adiantamento: ['', Validators.required],
        ValeTransporte: ['', Validators.required],
        Bonifica: ['', Validators.required],
      }),
      this.fb.group({
        IdFuncao: ['', Validators.required],
        IdSetor: ['', Validators.required],
      }),
      this.fb.group({
        IdBanco: [''],
        Agencia: [''],
        NumConta: [''],
        PIX: ['']
      }),
      this.fb.group({
        Valor: ['', Validators.required],
        DtAlteracao: ['', Validators.required],
        SalarioAtivo: ['', Validators.required],
      }),
    ];
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

  loadPessoas() {
    this.pessoaService.getPessoas().subscribe({
      next: (data) => {
        this.pessoas = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados' });
        console.error('Erro ao carregar pessoas:', error);
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
    this.pessoaForm.reset();
    this.submitted = false;
    this.pessoaDialog = true;
  }

  savePessoa() {
    this.submitted = true;

    if (this.formSteps.every(form => form.valid)) {
      const pessoaData = {
        NomePessoa: this.pessoaForm.get('NomePessoa')?.value,
        DadosPessoais: this.formSteps[0].value,
        Documentos: this.formSteps[1].value,
        Dependentes: this.formSteps[2].value,
        Enderecos: this.formSteps[3].value,
        Contatos: this.formSteps[4].value,
        DadosTrabalho: this.formSteps[5].value,
        Funcoes: this.formSteps[6].value,
        Contas: this.formSteps[7].value,
        Salarios: this.formSteps[8].value
      };

      this.dadosPessoaisService.addDadosPessoais(pessoaData.DadosPessoais).subscribe({
        next: (dadosPessoaisResponse) => {
          const idDadosPessoais = dadosPessoaisResponse.Id;

          this.documentoService.addDocumento(pessoaData.Documentos).subscribe({
            next: (documentoResponse) => {
              const idDocumentos = documentoResponse.Id;

              this.dependenteService.addDependente(pessoaData.Dependentes).subscribe({
                next: (dependenteResponse) => {
                  const idDependentes = dependenteResponse.Id;

                  this.enderecoService.addEndereco(pessoaData.Enderecos).subscribe({
                    next: (enderecoResponse) => {
                      const idEnderecos = enderecoResponse.Id;

                      this.contatoService.addContato(pessoaData.Contatos).subscribe({
                        next: (contatoResponse) => {
                          const idContatos = contatoResponse.Id;

                          this.dadosTrabalhoService.addDadosTrabalho(pessoaData.DadosTrabalho).subscribe({
                            next: (dadosTrabalhoResponse) => {
                              const idDadosTrabalho = dadosTrabalhoResponse.Id;

                              this.funcaoService.addFuncao(pessoaData.Funcoes).subscribe({
                                next: (funcaoResponse) => {
                                  const idFuncoes = funcaoResponse.Id;

                                  this.contaService.addConta(pessoaData.Contas).subscribe({
                                    next: (contaResponse) => {
                                      const idContas = contaResponse.Id;

                                      this.salarioService.addSalario(pessoaData.Salarios).subscribe({
                                        next: (salarioResponse) => {
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
    if (this.formSteps[this.activeIndex].valid) {
      this.activeIndex = this.activeIndex + 1;
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Preencha todos os campos corretamente', life: 3000 });
    }
  }

  prevPage() {
    this.activeIndex = this.activeIndex - 1;
  }
}