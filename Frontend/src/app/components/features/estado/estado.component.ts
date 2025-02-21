import { Component, OnInit } from '@angular/core';
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
import { Estado } from '../../interface/estado';

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule],
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class EstadoComponent implements OnInit {

  estados: Estado[] = [];
  estadoDialog: boolean = false;
  estado: Estado = { Id: 0, NomeEstado: '', Sigla: '' };
  submitted: boolean = false;

  constructor(
    private estadoService: EstadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadEstados();
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
    this.estado = { Id: 0, NomeEstado: '', Sigla: '' };
    this.submitted = false;
    this.estadoDialog = true;
  }

  editEstado(estado: Estado) {
    this.estado = { ...estado };
    this.estadoDialog = true;
  }

  deleteEstado(estado: Estado) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + estado.NomeEstado + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.estadoService.deleteEstado(estado.Id).subscribe({
          next: () => {
            this.estados = this.estados.filter(val => val.Id !== estado.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Estado Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o estado ' + estado.NomeEstado, life: 3000 });
            console.error('Erro ao deletar estado:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.estadoDialog = false;
    this.submitted = false;
  }

  saveEstado() {
    this.submitted = true;
    if (this.estado.NomeEstado?.trim() && this.estado.Sigla?.trim()) {
      this.estado.NomeEstado = this.estado.NomeEstado.toUpperCase();
      this.estado.Sigla = this.estado.Sigla.toUpperCase();
      if (this.estado.Id) {
        this.estadoService.updateEstado(this.estado.Id, this.estado).subscribe({
          next: () => {
            this.estados[this.findIndexById(this.estado.Id)] = this.estado;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Estado Atualizado', life: 3000 });
            this.loadEstados();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o estado ' + this.estado.NomeEstado, life: 3000 });
            console.error('Erro ao atualizar estado:', error);
          }
        });
      } else {
        this.estadoService.addEstado(this.estado).subscribe({
          next: (data) => {
            this.estados.push(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Estado Criado', life: 3000 });
            this.loadEstados();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o estado ' + this.estado.NomeEstado, life: 3000 });
            console.error('Erro ao criar estado:', error);
          }
        });
      }

      this.estados = [...this.estados];
      this.estadoDialog = false;
      this.estado = { Id: 0, NomeEstado: '', Sigla: '' };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.estados.length; i++) {
      if (this.estados[i].Id === Id) {
        index = i;
        break;
      }
    }
    return index;
  }
}