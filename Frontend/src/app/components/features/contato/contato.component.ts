import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../../../services/contato.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Contato } from '../../interface/contato';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, InputMaskModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ContatoComponent implements OnInit {

  contatos: Contato[] = [];
  contatoDialog: boolean = false;
  submitted: boolean = false;
  contatoForm: FormGroup;
  selectedContato: Contato | null = null;

  constructor(
    private contatoService: ContatoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    this.contatoForm = this.fb.group({
      Telefone: [''],
      Email: ['']
    });
  }

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
    this.submitted = false;
    this.contatoDialog = true;
    this.contatoForm.reset();
    this.selectedContato = null;
  }

  editContato(contato: Contato) {
    this.selectedContato = contato;
    this.contatoForm.patchValue(contato);
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
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Contato Deletado', life: 3000 });
            this.loadContatos();
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
    this.selectedContato = null;
  }

  saveContato() {
    this.submitted = true;

    if (this.contatoForm.valid) {
      const contatoFormValue = this.contatoForm.value as Contato;

      if (this.selectedContato) {
        const contatoEditado: Contato = { ...this.selectedContato, ...contatoFormValue };

        this.contatoService.updateContato(contatoEditado.Id, contatoEditado).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Contato Atualizado', life: 3000 });
            this.loadContatos();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o contato ' + contatoEditado.Telefone, life: 3000 });
            console.error('Erro ao atualizar contato:', error);
          }
        });
      } else {
        this.contatoService.addContato(contatoFormValue).subscribe({
          next: (data) => {
            this.contatos.push(data);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Contato Criado', life: 3000 });
            this.loadContatos();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o contato ' + contatoFormValue.Telefone, life: 3000 });
            console.error('Erro ao criar contato:', error);
          }
        });
      }

      this.contatos = [...this.contatos];
      this.contatoDialog = false;
      this.contatoForm.reset();
      this.selectedContato = null;
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