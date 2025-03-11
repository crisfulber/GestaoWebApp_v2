import { Component, OnInit } from '@angular/core';
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
import { InputNumberModule } from 'primeng/inputnumber';
import { PeriodoService } from '../../../services/periodo.service';
import { Periodo } from '../../interface/periodo';

@Component({
  selector: 'app-periodo',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, InputNumberModule],
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PeriodoComponent implements OnInit {

  periodos: Periodo[] = [];
  periodoDialog: boolean = false;
  periodo: Periodo = { Id: 0, Mes: '', Ano: 0 };
  submitted: boolean = false;

  constructor(
    private periodoService: PeriodoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadPeriodos();
  }

  loadPeriodos() {
    this.periodoService.getPeriodos().subscribe({
      next: (data) => {
        this.periodos = data.map(periodo => ({
            ...periodo,
            PeriodoFormatado: `${periodo.Mes}/${periodo.Ano}`
        }));
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar períodos' });
        console.error('Erro ao carregar períodos:', error);
      }
    });
  }

  openNew() {
    this.periodo = { Id: 0, Mes: '', Ano: 0 };
    this.submitted = false;
    this.periodoDialog = true;
  }

  editPeriodo(periodo: Periodo) {
    this.periodoDialog = true;
    this.periodo = { ...periodo };
  }

  deletePeriodo(periodo: Periodo) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o período com ID ' + periodo.Id + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.periodoService.deletePeriodo(periodo.Id).subscribe({
          next: () => {
            this.periodos = this.periodos.filter(val => val.Id !== periodo.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Período Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o período com ID ' + periodo.Id, life: 3000 });
            console.error('Erro ao deletar período:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.periodoDialog = false;
    this.submitted = false;
  }

  savePeriodo() {
    this.submitted = true;

    if (this.periodo.Mes && this.periodo.Ano) {
      this.periodo.Mes = this.periodo.Mes.toUpperCase();
      if (this.periodo.Id) {
        this.periodoService.updatePeriodo(this.periodo.Id, this.periodo).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Período Atualizado', life: 3000 });
            this.loadPeriodos();
            this.periodoDialog = false;
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o período', life: 3000 });
            console.error('Erro ao atualizar período:', error);
          }
        });
      } else {
        this.periodoService.addPeriodo(this.periodo).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Período Criado', life: 3000 });
            this.loadPeriodos();
            this.periodoDialog = false;
          },
          error: (error) => {
            console.error('Erro ao criar período:', error);
          }
        });
      }
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.periodos.length; i++) {
      if (this.periodos[i].Id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}