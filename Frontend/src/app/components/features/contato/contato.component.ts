import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../../../services/contato.service';
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
import { Contato } from '../../interface/contato';

@Component({
  selector: 'app-contato',
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ContatoComponent {

  contatos: Contato[] = [];
  contatoDialog: boolean = false;
  contato: Contato = { Id: 0, Telefone: '', Email: '' };
  submitted: boolean = false;

  constructor(
    private contatoService: ContatoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadContatos();
  }

  loadContatos() {
    this.contatoService.getContatos().subscribe({
      next: (data) => {
        this.contatos = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar contatos' });
        console.error('Erro ao carregar contatos:', error);
      }
    });
  }

  openNew() {
    this.contato = { Id: 0, Telefone: '', Email: '' };
    this.submitted = false;
    this.contatoDialog = true;
  }

  editContato(contato: Contato) {
    this.contato = { ...contato };
    this.contatoDialog = true;
  }

  deleteContato(contato: Contato) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + contato.Telefone + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contatoService.deleteContato(contato.Id).subscribe({
          next: () => {
            this.contatos = this.contatos.filter(val => val.Id !== contato.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contato Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o contato ' + contato.Telefone, life: 3000 });
            console.error('Erro ao deletar contato:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.contatoDialog = false;
    this.submitted = false;
  }

  saveContato() {
    this.submitted = true;
    if (this.contato.Telefone?.trim() && this.contato.Email?.trim()) {
      this.contato.Telefone = this.contato.Telefone.toUpperCase();
      this.contato.Email = this.contato.Email.toUpperCase();
      if (this.contato.Id) {
        this.contatoService.updateContato(this.contato.Id, this.contato).subscribe({
          next: () => {
            this.contatos[this.findIndexById(this.contato.Id)] = this.contato;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contato Atualizado', life: 3000 });
            this.loadContatos();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o contato ' + this.contato.Telefone, life: 3000 });
            console.error('Erro ao atualizar contato:', error);
          }
        });
      } else {
        this.contatoService.addContato(this.contato).subscribe({
          next: (data) => {
            this.contatos.push(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contato Criado', life: 3000 });
            this.loadContatos();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o contato ' + this.contato.Telefone, life: 3000 });
            console.error('Erro ao criar contato:', error);
          }
        });
      }

      this.contatos = [...this.contatos];
      this.contatoDialog = false;
      this.contato = { Id: 0, Telefone: '', Email: '' };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.contatos.length; i++) {
      if (this.contatos[i].Id === Id) {
        index = i;
        break;
      }
    }
    return index;
  }
}