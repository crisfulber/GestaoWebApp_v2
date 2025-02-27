import { Component, OnInit } from '@angular/core';
import { EscolaridadeService } from '../../../services/escolaridade.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Escolaridade } from '../../interface/escolaridade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-escolaridade',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, DialogModule],
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EscolaridadeComponent implements OnInit {

  escolaridades: Escolaridade[] = [];
  escolaridadeDialog: boolean = false;
  escolaridade: Escolaridade = { Id: 0, NomeEscolaridade: '' };
  submitted: boolean = false;

  constructor(
    private escolaridadeService: EscolaridadeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadEscolaridades();
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

  openNew() {
    this.escolaridade = { Id: 0, NomeEscolaridade: '' };
    this.submitted = false;
    this.escolaridadeDialog = true;
  }

  editEscolaridade(escolaridade: Escolaridade) {
    this.escolaridade = { ...escolaridade };
    this.escolaridadeDialog = true;
  }

  deleteEscolaridade(escolaridade: Escolaridade) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + escolaridade.NomeEscolaridade + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.escolaridadeService.deleteEscolaridade(escolaridade.Id).subscribe({
          next: () => {
            this.escolaridades = this.escolaridades.filter(val => val.Id !== escolaridade.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Escolaridade Deletada', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a escolaridade ' + escolaridade.NomeEscolaridade, life: 3000 });
            console.error('Erro ao deletar escolaridade:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.escolaridadeDialog = false;
    this.submitted = false;
  }

  saveEscolaridade() {
    this.submitted = true;

    if (this.escolaridade.NomeEscolaridade?.trim()) {
      this.escolaridade.NomeEscolaridade = this.escolaridade.NomeEscolaridade.toUpperCase();
      if (this.escolaridade.Id) {
        this.escolaridadeService.updateEscolaridade(this.escolaridade.Id, this.escolaridade).subscribe({
          next: () => {
            this.escolaridades[this.findIndexById(this.escolaridade.Id)] = this.escolaridade;
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Escolaridade Atualizada', life: 3000 });
            this.loadEscolaridades();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a escolaridade ' + this.escolaridade.NomeEscolaridade, life: 3000 });
            console.error('Erro ao atualizar escolaridade:', error);
          }
        });
      } else {
        this.escolaridadeService.addEscolaridade(this.escolaridade).subscribe({
          next: (data) => {
            this.escolaridades.push(data);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Escolaridade Criada', life: 3000 });
            this.loadEscolaridades();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar a escolaridade ' + this.escolaridade.NomeEscolaridade, life: 3000 });
            console.error('Erro ao criar escolaridade:', error);
          }
        });
      }

      this.escolaridades = [...this.escolaridades];
      this.escolaridadeDialog = false;
      this.escolaridade = { Id: 0, NomeEscolaridade: '' };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.escolaridades.length; i++) {
      if (this.escolaridades[i].Id === Id) {
        index = i;
        break;
      }
    }

    return index;
  }
}