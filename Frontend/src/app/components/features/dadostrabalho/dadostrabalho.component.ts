import { Component, OnInit } from '@angular/core';
import { DadosTrabalhoService } from '../../../services/dadosTrabalho.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { DadosTrabalho } from '../../interface/dadosTrabalho';

@Component({
  selector: 'app-dadostrabalho',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, InputMaskModule, CheckboxModule],
  templateUrl: './dadostrabalho.component.html',
  styleUrls: ['./dadostrabalho.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DadosTrabalhoComponent implements OnInit {

  dadosTrabalhoLista: DadosTrabalho[] = [];
  dadosTrabalhoDialog: boolean = false;
  dadosTrabalho: DadosTrabalho = {
    Id: 0,
    NumRegistro: '',
    DtInicio: '',
    DtRegistro: '',
    Ativo: false,
    Almoco: false,
    Adiantamento: false,
    ValeTransporte: false,
    Bonifica: false,
  };
  submitted: boolean = false;

  constructor(
    private dadosTrabalhoService: DadosTrabalhoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.loadDadosTrabalho();
  }

  loadDadosTrabalho() {
    this.dadosTrabalhoService.getDadosTrabalhos().subscribe({
      next: (data) => {
        this.dadosTrabalhoLista = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados do trabalho' });
        console.error('Erro ao carregar dados do trabalho:', error);
      }
    });
  }

  openNew() {
    this.dadosTrabalho = {
      Id: 0,
      NumRegistro: '',
      DtInicio: '',
      DtRegistro: '',
      Ativo: false,
      Almoco: false,
      Adiantamento: false,
      ValeTransporte: false,
      Bonifica: false,
    };
    this.submitted = false;
    this.dadosTrabalhoDialog = true;
  }

  editDadosTrabalho(dadosTrabalho: DadosTrabalho) {
    this.dadosTrabalhoDialog = true;
    this.dadosTrabalho = { ...dadosTrabalho };
  }

  deleteDadosTrabalho(dadosTrabalho: DadosTrabalho) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + dadosTrabalho.NumRegistro + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dadosTrabalhoService.deleteDadosTrabalho(dadosTrabalho.Id).subscribe({
          next: () => {
            this.dadosTrabalhoLista = this.dadosTrabalhoLista.filter(val => val.Id !== dadosTrabalho.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Registro Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o registro ' + dadosTrabalho.NumRegistro, life: 3000 });
            console.error('Erro ao deletar registro:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.dadosTrabalhoDialog = false;
    this.submitted = false;
  }

  saveDadosTrabalho() {
    this.submitted = true;

    if (this.dadosTrabalho.Id) {
      this.dadosTrabalhoService.updateDadosTrabalho(this.dadosTrabalho.Id, this.dadosTrabalho).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Registro atualizado', life: 3000 });
          this.loadDadosTrabalho();
          this.dadosTrabalhoDialog = false;
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar registro ' + this.dadosTrabalho.NumRegistro, life: 3000 });
          console.error('Erro ao atualizar registro:', error);
        }
      });
    } else {
      this.dadosTrabalhoService.addDadosTrabalho(this.dadosTrabalho).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Registro Criado', life: 3000 });
          this.loadDadosTrabalho();
          this.dadosTrabalhoDialog = false;
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar a registro ' + this.dadosTrabalho.NumRegistro, life: 3000 });
          console.error('Erro ao criar registro:', error);
        }
      });
    }

    this.dadosTrabalhoDialog = false;
    this.dadosTrabalho = {
      Id: 0,
      NumRegistro: '',
      DtInicio: '',
      DtRegistro: '',
      Ativo: false,
      Almoco: false,
      Adiantamento: false,
      ValeTransporte: false,
      Bonifica: false,
    };
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.dadosTrabalhoLista.length; i++) {
      if (this.dadosTrabalhoLista[i].Id === Id) {
        index = i;
        break;
      }
    }

    return index;
  }
}