import { Component, OnInit } from '@angular/core';
import { FuncaoService } from '../../../services/funcao.service';
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
import { Funcao } from '../../interface/funcao';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SetorService } from '../../../services/setor.service';
import { Setor } from '../../interface/setor';

@Component({
  selector: 'app-funcao',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, DialogModule, DropdownModule],
  templateUrl: './funcao.component.html',
  styleUrls: ['./funcao.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FuncaoComponent implements OnInit {

  funcoes: Funcao[] = [];
  funcaoDialog: boolean = false;
  funcao: Funcao = { Id: 0, NomeFuncao: '', IdSetor: 0 }; 
  submitted: boolean = false;
  setores: Setor[] = [];

  constructor(
    private funcaoService: FuncaoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private setorService: SetorService
  ) { }

  ngOnInit() {
    this.loadFuncoes();
    this.loadSetores();
  }

  loadFuncoes() {
    this.funcaoService.getFuncoes().subscribe({
      next: (data) => {
        this.funcoes = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar funções' });
        console.error('Erro ao carregar funções:', error);
      }
    });
  }

  loadSetores() {
    this.setorService.getSetores().subscribe({
      next: (data) => {
        this.setores = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar setores' });
        console.error('Erro ao carregar setores:', error);
      }
    });
  }

  openNew() {
    this.funcao = { Id: 0, NomeFuncao: '', IdSetor: 0 };
    this.submitted = false;
    this.funcaoDialog = true;
  }

  editFuncao(funcao: Funcao) {
    this.funcao = { ...funcao };
    this.funcaoDialog = true;
  }

  deleteFuncao(funcao: Funcao) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + funcao.NomeFuncao + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.funcaoService.deleteFuncao(funcao.Id).subscribe({
          next: () => {
            this.funcoes = this.funcoes.filter(val => val.Id !== funcao.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Função Deletada', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a função ' + funcao.NomeFuncao, life: 3000 });
            console.error('Erro ao deletar função:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.funcaoDialog = false;
    this.submitted = false;
  }

  saveFuncao() {
    this.submitted = true;

    if (this.funcao.NomeFuncao?.trim() && this.funcao.IdSetor) {
      if (this.funcao.Id) {
        this.funcaoService.updateFuncao(this.funcao.Id, this.funcao).subscribe({
          next: () => {
            this.funcoes[this.findIndexById(this.funcao.Id)] = this.funcao;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Função Atualizada', life: 3000 });
            this.loadFuncoes();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'Função Atualizada', life: 3000 });
            this.loadFuncoes();
          }
        });
      } else {
        this.funcaoService.addFuncao(this.funcao).subscribe({
          next: (data) => {
            this.funcoes.push(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Função Criada', life: 3000 });
            this.loadFuncoes();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Função Atualizada', life: 3000 });
            this.loadFuncoes();
          }
        });
      }

      this.funcoes = [...this.funcoes];
      this.funcaoDialog = false;
      this.funcao = { Id: 0, NomeFuncao: '', IdSetor: 0 };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.funcoes.length; i++) {
      if (this.funcoes[i].Id === Id) {
        index = i;
        break;
      }
    }

    return index;
  }
}