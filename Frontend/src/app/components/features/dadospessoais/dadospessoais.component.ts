import { Component, OnInit } from '@angular/core';
import { DadosPessoaisService } from '../../../services/dadosPessoais';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { DadosPessoais } from '../../interface/dadosPessoais';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { Municipio } from '../../interface/municipio';
import { Nacionalidade } from '../../interface/nacionalidade';
import { Escolaridade } from '../../interface/escolaridade';
import { EstadoCivil } from '../../interface/estadoCivil';
import { MunicipioService } from '../../../services/municipio.service';
import { NacionalidadeService } from '../../../services/nacionalidade.service';
import { EscolaridadeService } from '../../../services/escolaridade.service';
import { EstadoCivilService } from '../../../services/estadoCivil';

@Component({
  selector: 'app-dadospessoais',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, DropdownModule, InputMaskModule],
  templateUrl: './dadospessoais.component.html',
  styleUrls: ['./dadospessoais.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DadosPessoaisComponent implements OnInit {

  dadosPessoaisLista: DadosPessoais[] = [];
  dadosPessoaisDialog: boolean = false;
  dadosPessoais: DadosPessoais = {
    Id: 0,
    NomePai: '',
    NomeMae: '',
    IdMunicipio: null,
    IdNacionalidade: null,
    IdEscolaridade: null,
    DtNascimento: '',
    IdEstadoCivil: null,
    NomeConjuge: ''
  };
  municipios: Municipio[] = [];
  nacionalidades: Nacionalidade[] = [];
  escolaridades: Escolaridade[] = [];
  estadosCivis: EstadoCivil[] = [];

  submitted: boolean = false;

  constructor(
    private dadosPessoaisService: DadosPessoaisService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private municipioService: MunicipioService,
    private nacionalidadeService: NacionalidadeService,
    private escolaridadeService: EscolaridadeService,
    private estadoCivilService: EstadoCivilService
  ) { }

  ngOnInit() {
    this.loadDadosPessoais();
    this.loadMunicipios();
    this.loadNacionalidades();
    this.loadEstadosCivis();
    this.loadEscolaridades();
  }

  loadDadosPessoais() {
    this.dadosPessoaisService.getDadosPessoais().subscribe({
      next: (data) => {
        this.dadosPessoaisLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados pessoais' });
        console.error('Erro ao carregar dados pessoais:', error);
      }
    });
  }

  loadMunicipios() {
    this.municipioService.getMunicipios().subscribe({
      next: (data) => {
        this.municipios = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar municipios' });
        console.error('Erro ao carregar municipios:', error);
      }
    });
  }

  loadNacionalidades() {
    this.nacionalidadeService.getNacionalidades().subscribe({
      next: (data) => {
        this.nacionalidades = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar nacionalidades' });
        console.error('Erro ao carregar nacionalidades:', error);
      }
    });
  }

  loadEscolaridades() {
    this.escolaridadeService.getEscolaridades().subscribe({
      next: (data) => {
        this.escolaridades = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar escolaridades' });
        console.error('Erro ao carregar escolaridades:', error);
      }
    });
  }

  loadEstadosCivis() {
    this.estadoCivilService.getEstadosCivis().subscribe({
      next: (data) => {
        this.estadosCivis = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar estados civis' });
        console.error('Erro ao carregar estados civis:', error);
      }
    });
  }

  openNew() {
    this.dadosPessoais = {
      Id: 0,
      NomePai: '',
      NomeMae: '',
      IdMunicipio: null,
      IdNacionalidade: null,
      IdEscolaridade: null,
      DtNascimento: '',
      IdEstadoCivil: null,
      NomeConjuge: ''
    };
    this.submitted = false;
    this.dadosPessoaisDialog = true;
  }

  editDadosPessoais(dadosPessoais: DadosPessoais) {
    this.dadosPessoaisDialog = true;
    this.dadosPessoais = { ...dadosPessoais };
  }

  deleteDadosPessoais(dadosPessoais: DadosPessoais) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar os dados pessoais com ID ' + dadosPessoais.Id + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dadosPessoaisService.deleteDadosPessoais(dadosPessoais.Id).subscribe({
          next: () => {
            this.dadosPessoaisLista = this.dadosPessoaisLista.filter(val => val.Id !== dadosPessoais.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dados pessoais Deletados', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar os dados pessoais com ID ' + dadosPessoais.Id, life: 3000 });
            console.error('Erro ao deletar dados pessoais:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.dadosPessoaisDialog = false;
    this.submitted = false;
  }

  saveDadosPessoais() {
    this.submitted = true;

    this.dadosPessoais.NomePai = this.dadosPessoais.NomePai?.toUpperCase() || '';
    this.dadosPessoais.NomeMae = this.dadosPessoais.NomeMae?.toUpperCase() || '';
    this.dadosPessoais.NomeConjuge = this.dadosPessoais.NomeConjuge?.toUpperCase() || '';

    if (this.dadosPessoais.NomeMae && this.dadosPessoais.DtNascimento) {
      if (this.dadosPessoais.Id) {
        this.dadosPessoaisService.updateDadosPessoais(this.dadosPessoais.Id, this.dadosPessoais).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dados pessoais Atualizados', life: 3000 });
            this.loadDadosPessoais();
            this.dadosPessoaisDialog = false;
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar os dados pessoais', life: 3000 });
            console.error('Erro ao atualizar dados pessoais:', error);
          }
        });
      } else {
        this.dadosPessoaisService.addDadosPessoais(this.dadosPessoais).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dados pessoais Criados', life: 3000 });
            this.loadDadosPessoais();
            this.dadosPessoaisDialog = false;
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar os dados pessoais', life: 3000 });
            console.error('Erro ao criar dados pessoais:', error);
          }
        });
      }
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.dadosPessoaisLista.length; i++) {
      if (this.dadosPessoaisLista[i].Id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}