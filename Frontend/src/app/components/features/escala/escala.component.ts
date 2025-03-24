import { Component, OnInit } from '@angular/core';
import { EscalaService } from '../../../services/escala.service';
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
import { Escala } from '../../interface/escala';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-escala',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, DialogModule],
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EscalaComponent implements OnInit {

  escalas: Escala[] = [];
  escalaDialog: boolean = false;
  escala: Escala = { Id: 0, NomeEscala: '', Descricao: '' };
  submitted: boolean = false;

  constructor(
    private escalaService: EscalaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadEscalas();
  }

  loadEscalas() {
    this.escalaService.getEscalas().subscribe({
      next: (data) => {
        this.escalas = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar escalas' });
        console.error('Erro ao carregar escalas:', error);
      }
    });
  }

  openNew() {
    this.escala = { Id: 0, NomeEscala: '', Descricao: '' };
    this.submitted = false;
    this.escalaDialog = true;
  }

  editEscala(escala: Escala) {
    this.escala = { ...escala };
    this.escalaDialog = true;
  }

  deleteEscala(escala: Escala) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + escala.NomeEscala + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.escalaService.deleteEscala(escala.Id).subscribe({
          next: () => {
            this.escalas = this.escalas.filter(val => val.Id !== escala.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Escala Deletada', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a escala ' + escala.NomeEscala, life: 3000 });
            console.error('Erro ao deletar escala:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.escalaDialog = false;
    this.submitted = false;
  }

  saveEscala() {
    this.submitted = true;

    if (this.escala.NomeEscala?.trim()) {
      this.escala.NomeEscala = this.escala.NomeEscala.toUpperCase();
      this.escala.Descricao = this.escala.Descricao?.toUpperCase();
      if (this.escala.Id) {
        this.escalaService.updateEscala(this.escala.Id, this.escala).subscribe({
          next: () => {
            this.escalas[this.findIndexById(this.escala.Id)] = this.escala;
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Escala Atualizada', life: 3000 });
            this.loadEscalas();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a escala ' + this.escala.NomeEscala, life: 3000 });
            console.error('Erro ao atualizar escala:', error);
          }
        });
      } else {
        this.escalaService.addEscala(this.escala).subscribe({
          next: (data) => {
            this.escalas.push(data);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Escala Criada', life: 3000 });
            this.loadEscalas();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar a escala ' + this.escala.NomeEscala, life: 3000 });
            console.error('Erro ao criar escala:', error);
          }
        });
      }

      this.escalas = [...this.escalas];
      this.escalaDialog = false;
      this.escala = { Id: 0, NomeEscala: '', Descricao: '' };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.escalas.length; i++) {
      if (this.escalas[i].Id === Id) {
        index = i;
        break;
      }
    }

    return index;
  }
}