import { Component, OnInit } from '@angular/core';
import { UnidadeDto, UnidadeService } from '../../../services/unidade.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Unidade } from '../../interface/unidade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../interface/empresa';
import { MunicipioService } from '../../../services/municipio.service';
import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../interface/estado';
import { Municipio } from '../../interface/municipio';

@Component({
  selector: 'app-unidade',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, DialogModule, StepsModule, DropdownModule, InputMaskModule],
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UnidadeComponent implements OnInit {

  unidades: Unidade[] = [];
  unidadeDialog: boolean = false;
  unidade: Unidade = {
    Id: 0,
    NomeUnidade: '',
    IdEmpresa: 0,
    IdEndereco: 0
  };
  submitted: boolean = false;
  formSteps: FormGroup[] = [];

  steps: MenuItem[] = [];
  activeIndex: number = 0;
  empresas: Empresa[] = [];
  municipios: Municipio[] = [];
  estados: Estado[] = [];

  constructor(
    private unidadeService: UnidadeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private municipioService: MunicipioService,
    private estadoService: EstadoService,
  ) {
    this.formSteps = [
      this.fb.group({
        NomeUnidade: ['', Validators.required],
        IdEmpresa: [null, Validators.required]
      }),
      this.fb.group({
        Rua: ['', Validators.required],
        Numero: ['', Validators.required],
        Complemento: [''],
        Bairro: ['', Validators.required],
        CEP: ['', Validators.required],
        IdMunicipio: [null, Validators.required],
        IdEstado: [null, Validators.required]
      })
    ];
  }

  ngOnInit() {
    this.loadUnidades();
    this.loadEmpresas();
    this.loadMunicipios();
    this.loadEstados();

    this.steps = [
      { label: 'Unidade' },
      { label: 'Endereço' }
    ];
  }

  loadUnidades() {
    this.unidadeService.getUnidades().subscribe({
      next: (data) => {
        this.unidades = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar unidades' });
        console.error('Erro ao carregar unidades:', error);
      }
    });
  }

  loadEmpresas() {
    this.empresaService.getEmpresas().subscribe({
      next: (data) => {
        this.empresas = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar empresas' });
        console.error('Erro ao carregar empresas:', error);
      }
    });
  }

  loadMunicipios() {
    this.municipioService.getMunicipios().subscribe({
      next: (data) => {
        this.municipios = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar municípios' });
        console.error('Erro ao carregar municípios:', error);
      }
    });
  }

  loadEstados() {
    this.estadoService.getEstados().subscribe({
      next: (data) => {
        this.estados = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar estados' });
        console.error('Erro ao carregar estados:', error);
      }
    });
  }

  openNew() {
    this.unidade = {
      Id: 0,
      NomeUnidade: '',
      IdEmpresa: 0,
      IdEndereco: 0
    };
    this.submitted = false;
    this.unidadeDialog = true;
    this.formSteps.forEach(form => form.reset());
    this.activeIndex = 0;
  }

  editUnidade(unidade: Unidade) {
    this.unidadeService.getUnidade(unidade.Id).subscribe({
      next: (data) => {
        console.log('Dados da unidade:', data); 
        this.unidade = { ...data };
        this.unidadeDialog = true;
        this.formSteps[0].patchValue({
          NomeUnidade: data.NomeUnidade,
          IdEmpresa: data.IdEmpresa
        });
        this.formSteps[1].patchValue({
          Rua: data.Endereco?.Rua,
          Numero: data.Endereco?.Numero,
          Complemento: data.Endereco?.Complemento,
          Bairro: data.Endereco?.Bairro,
          CEP: data.Endereco?.CEP,
          IdMunicipio: data.Endereco?.IdMunicipio,
          IdEstado: data.Endereco?.IdEstado
        });
        this.activeIndex = 0;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar detalhes da unidade' });
        console.error('Erro ao carregar detalhes da unidade:', error);
      }
    });
  }

  deleteUnidade(unidade: Unidade) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + unidade.NomeUnidade + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.unidadeService.deleteUnidade(unidade.Id).subscribe({
          next: () => {
            this.unidades = this.unidades.filter(val => val.Id !== unidade.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Unidade Deletada', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a unidade ' + unidade.NomeUnidade, life: 3000 });
            console.error('Erro ao deletar unidade:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.unidadeDialog = false;
    this.submitted = false;
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

  saveUnidade() {
    this.submitted = true;
    if (this.formSteps.every(form => form.valid)) {

      const formData: any = {
        NomeUnidade: this.formSteps[0].get('NomeUnidade')?.value.toUpperCase(),
        IdEmpresa: this.formSteps[0].get('IdEmpresa')?.value,
        Rua: this.formSteps[1].get('Rua')?.value.toUpperCase(),
        Numero: this.formSteps[1].get('Numero')?.value,
        Complemento: this.formSteps[1].get('Complemento')?.value.toUpperCase(),
        Bairro: this.formSteps[1].get('Bairro')?.value.toUpperCase(),
        CEP: this.formSteps[1].get('CEP')?.value,
        IdMunicipio: this.formSteps[1].get('IdMunicipio')?.value,
        IdEstado: this.formSteps[1].get('IdEstado')?.value,
      };

      if (this.unidade.Id) {
        this.unidadeService.updateUnidade(this.unidade.Id, formData).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Unidade Atualizada', life: 3000 });
            this.loadUnidades();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a unidade ' + this.unidade.NomeUnidade, life: 3000 });
            console.error('Erro ao atualizar unidade:', error);
          }
        });
      } else {
        this.unidadeService.addUnidade(formData).subscribe({
          next: (data) => {
            this.unidades.push(data);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Unidade Criada', life: 3000 });
            this.loadUnidades();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar a unidade ' + this.unidade.NomeUnidade, life: 3000 });
            console.error('Erro ao criar unidade:', error);
          }
        });
      }

      this.unidades = [...this.unidades];
      this.unidadeDialog = false;
      this.unidade = {
        Id: 0,
        NomeUnidade: '',
        IdEmpresa: 0,
        IdEndereco: 0
      };
      this.activeIndex = 0;
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Formulário incompleto', life: 3000 });
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.unidades.length; i++) {
      if (this.unidades[i].Id === Id) {
        index = i;
        break;
      }
    }

    return index;
  }
}