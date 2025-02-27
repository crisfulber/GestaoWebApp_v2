import { Component, OnInit } from '@angular/core';
import { ContaService } from '../../../services/conta.service';
import { BancoService } from '../../../services/banco.service';
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
import { Conta } from '../../interface/conta';
import { Banco } from '../../interface/banco';

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, DropdownModule, AutoCompleteModule],
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ContaComponent implements OnInit {

  contas: Conta[] = [];
  bancos: Banco[] = [];
  contaDialog: boolean = false;
  conta: Conta = { Id: 0, IdBanco: null, Agencia: null, NumConta: null, PIX: '' };
  submitted: boolean = false;

  constructor(
    private contaService: ContaService,
    private bancoService: BancoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadContas();
    this.loadBancos();
  }

  loadContas() {
    this.contaService.getContas().subscribe({
      next: (data) => {
        this.contas = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar contas' });
        console.error('Erro ao carregar contas:', error);
      }
    });
  }

  loadBancos() {
    this.bancoService.getBancos().subscribe({
      next: (data) => {
        this.bancos = data;
        console.log('Dados dos bancos:', this.bancos); // Adicione este console.log
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar bancos' });
        console.error('Erro ao carregar bancos:', error);
      }
    });
  }

  openNew() {
    this.conta = { Id: 0, IdBanco: null, Agencia: null, NumConta: null, PIX: '' };
    this.submitted = false;
    this.contaDialog = true;
  }

  editConta(conta: Conta) {
    this.conta = { ...conta };
    this.contaDialog = true;
  }

  deleteConta(conta: Conta) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + conta.NumConta + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contaService.deleteConta(conta.Id).subscribe({
          next: () => {
            this.contas = this.contas.filter(val => val.Id !== conta.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Conta Deletada', life: 3000 });
            this.loadContas();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a conta ' + conta.NumConta, life: 3000 });
            console.error('Erro ao deletar conta:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.contaDialog = false;
    this.submitted = false;
  }

  saveConta() {
    this.submitted = true;

    if (this.conta.Id) {
      this.contaService.updateConta(this.conta.Id, this.conta).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Conta Atualizada', life: 3000 });
          this.loadContas();
          this.contaDialog = false;
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a conta ' + this.conta.NumConta, life: 3000 });
          console.error('Erro ao atualizar conta:', error);
        }
      });
    } else {
      this.contaService.addConta(this.conta).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Conta Criada', life: 3000 });
          this.loadContas();
          this.contaDialog = false;
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar a conta ' + this.conta.NumConta, life: 3000 });
          console.error('Erro ao criar conta:', error);
        }
      });
    }

    this.contaDialog = false;
    this.conta = { Id: 0, IdBanco: null, Agencia: null, NumConta: null, PIX: '' };
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.contas.length; i++) {
      if (this.contas[i].Id === Id) {
        index = i;
        break;
      }
    }
    return index;
  }

  formatarNumeroConta(numConta: number | null | undefined): string {
    if (!numConta) {
      return '';
    }
    const numContaStr = numConta.toString();
    if (numContaStr.length <= 1) {
      return numContaStr; // Não há nada para separar
    }
    const parteInicial = numContaStr.slice(0, -1);
    const ultimoDigito = numContaStr.slice(-1);
    return `${parteInicial}-${ultimoDigito}`;
  }
}