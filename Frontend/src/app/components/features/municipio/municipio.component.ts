import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { MunicipioService } from '../../../services/municipio.service';
import { EstadoService } from '../../../services/estado.service';
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
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Municipio } from '../../interface/municipio';
import { Estado } from '../../interface/estado';

@Component({
  selector: 'app-municipio',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, DropdownModule, AutoCompleteModule],
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css'],
  providers: [MessageService, ConfirmationService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MunicipioComponent implements OnInit {

  municipios: Municipio[] = [];
  estados: Estado[] = [];
  municipioDialog: boolean = false;
  municipio: Municipio = { Id: 0, NomeMunicipio: '', IdEstado: null };
  submitted: boolean = false;

  constructor(
    private municipioService: MunicipioService,
    private estadoService: EstadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadMunicipios();
    this.loadEstados();
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
    this.municipio = { Id: 0, NomeMunicipio: '', IdEstado: null };
    this.submitted = false;
    this.municipioDialog = true;
  }

  editMunicipio(municipio: Municipio) {
    this.municipio = { ...municipio };
    this.municipioDialog = true;
  }

  deleteMunicipio(municipio: Municipio) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + municipio.NomeMunicipio + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.municipioService.deleteMunicipio(municipio.Id).subscribe({
          next: () => {
            this.municipios = this.municipios.filter(val => val.Id !== municipio.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Município Deletado', life: 3000 });
            this.loadMunicipios();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o município ' + municipio.NomeMunicipio, life: 3000 });
            console.error('Erro ao deletar município:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.municipioDialog = false;
    this.submitted = false;
  }

  saveMunicipio() {
    this.submitted = true;

    if (this.municipio.NomeMunicipio?.trim() && this.municipio.IdEstado) {
      this.municipio.NomeMunicipio = this.municipio.NomeMunicipio.toUpperCase();

      const estadoId = this.municipio.IdEstado == null ? 0 : this.municipio.IdEstado;

      const municipioParaEnviar = {
        ...this.municipio,
        IdEstado: estadoId,
      };

      if (this.municipio.Id) {
        this.municipioService.updateMunicipio(this.municipio.Id, this.municipio).subscribe({
          next: () => {
            this.municipios[this.findIndexById(this.municipio.Id)] = this.municipio;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Município Atualizado', life: 3000 });
            this.loadMunicipios();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o município ' + this.municipio.NomeMunicipio, life: 3000 });
            console.error('Erro ao atualizar município:', error);
          }
        });
      } else {
        this.municipioService.addMunicipio(this.municipio).subscribe({
          next: (data) => {
            this.municipios.push(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Município Criado', life: 3000 });
            this.loadMunicipios();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o município ' + this.municipio.NomeMunicipio, life: 3000 });
            console.error('Erro ao criar município:', error);
          }
        });
      }

      this.municipios = [...this.municipios];
      this.municipioDialog = false;
      this.municipio = { Id: 0, NomeMunicipio: '', IdEstado: 0 };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.municipios.length; i++) {
      if (this.municipios[i].Id === Id) {
        index = i;
        break;
      }
    }
    return index;
  }

  getEstadoSigla(idEstado: number): string {
    const estado = this.estados.find(e => e.Id === idEstado);
    return estado ? estado.Sigla : '';
  }
}