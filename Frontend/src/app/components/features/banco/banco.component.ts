import { Component, OnInit } from '@angular/core';
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
import { Banco } from '../../interface/banco';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-banco',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, InputMaskModule],
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class BancoComponent implements OnInit {

  bancos: Banco[] = [];
  bancoDialog: boolean = false;
  banco: Banco = {
    Id: 0,
    NomeBanco: '',
    Codigo: 0,
  };
  submitted: boolean = false;

  constructor(
    private bancoService: BancoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadBancos();
  }

  loadBancos() {
    this.bancoService.getBancos().subscribe({
      next: (data) => {
        this.bancos = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar bancos' });
        console.error('Erro ao carregar bancos:', error);
      }
    });
  }

  openNew() {
    this.banco = {
      Id: 0,
      NomeBanco: '',
      Codigo: 0,
    };
    this.submitted = false;
    this.bancoDialog = true;
  }

  editBanco(banco: Banco) {
    this.bancoDialog = true;
    this.banco = { ...banco };
  }

  deleteBanco(banco: Banco) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o banco com Codigo ' + banco.Codigo + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bancoService.deleteBanco(banco.Id).subscribe({
          next: () => {
            this.bancos = this.bancos.filter(val => val.Id !== banco.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Banco Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o banco com Codigo ' + banco.Codigo, life: 3000 });
            console.error('Erro ao deletar banco:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.bancoDialog = false;
    this.submitted = false;
  }

  saveBanco() {
    if (this.banco) {

      this.banco.NomeBanco = this.banco.NomeBanco.toUpperCase();

      if (this.banco.Id) {
        this.bancoService.updateBanco(this.banco.Id, this.banco).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Banco atualizado com sucesso' });
            this.loadBancos();
            this.bancoDialog = false;
          },
          error: (err) => {
            console.error('Erro ao atualizar banco:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar banco' });
          }
        });

      } else {
        this.bancoService.addBanco(this.banco).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Banco criado com sucesso' });
            this.loadBancos();
            this.bancoDialog = false;
          },
          error: (err) => {
            console.error('Erro ao criar banco:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar banco' });
          }
        });
      }
    }
  }

  findIndexById(Id: number): number {
    let index = -1; for (let i = 0; i < this.bancos.length; i++) {
      if (this.bancos[i].Id === Id) {
        index = i;
        break;
      }
    }
    return index;
  }
}