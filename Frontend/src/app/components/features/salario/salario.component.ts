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
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { SalarioService } from '../../../services/salario.service';
import { Salario } from '../../interface/salario';

@Component({
  selector: 'app-salario',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, InputNumberModule, CheckboxModule, InputMaskModule],
  templateUrl: './salario.component.html',
  styleUrls: ['./salario.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SalarioComponent implements OnInit {

  salarios: Salario[] = [];
  salarioDialog: boolean = false;
  salario: Salario = { Id: 0, Valor: 0, DtAlteracao: '', SalarioAtivo: false };
  submitted: boolean = false;

  constructor(
    private salarioService: SalarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadSalarios();
  }

  loadSalarios() {
    this.salarioService.getSalarios().subscribe({
      next: (data) => {
        this.salarios = data.map(salario => {
          return {
            ...salario,
            DtAlteracao: this.formatarDataParaTela(salario.DtAlteracao)
          };
        });
        console.log('Dados recebidos do backend:', data);
        this.salarios = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar salários' });
        console.error('Erro ao carregar salários:', error);
      }
    });
  }

  openNew() {
    this.salario = { Id: 0, Valor: 0, DtAlteracao: '', SalarioAtivo: false };
    this.submitted = false;
    this.salarioDialog = true;
  }

  editSalario(salario: Salario) {
    this.salarioDialog = true;
    this.salario = { ...salario };

    if (this.salario.DtAlteracao) {
      this.salario.DtAlteracao = this.formatarDataParaTela(this.salario.DtAlteracao);
    }
  }

  formatarDataParaTela(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regexDDMMYYYY.test(data)) {
      return data;
    }

    const parts = data.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    console.error("Formato de data inválido:", data);
    return data;
  }

  formatarDataParaBanco(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const parts = data.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    console.error("Formato de data inválido para envio ao banco:", data);
    return data;
  }

  formatarValor(valor: number | null | undefined): string {
    if (valor === null || valor === undefined) {
      return 'R$ 0,00';
    }
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  deleteSalario(salario: Salario) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o salário com ID ' + salario.Id + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.salarioService.deleteSalario(salario.Id).subscribe({
          next: () => {
            this.salarios = this.salarios.filter(val => val.Id !== salario.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Salário Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o salário com ID ' + salario.Id, life: 3000 });
            console.error('Erro ao deletar salário:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.salarioDialog = false;
    this.submitted = false;
  }

  saveSalario() {
    this.submitted = true;
    console.log('Salário a ser enviado:', this.salario); // Adicione este console.log

    if (this.salario.Valor && this.salario.DtAlteracao) {
      // Formatando a data antes de enviar para o backend
      this.salario.DtAlteracao = this.formatarDataParaBanco(this.salario.DtAlteracao); // Formata a data

      if (this.salario.Id) {
        this.salarioService.updateSalario(this.salario.Id, this.salario).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Salário Atualizado', life: 3000 });
            this.loadSalarios();
            this.salarioDialog = false;
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o salário', life: 3000 });
            console.error('Erro ao atualizar salário:', error);
          }
        });
      } else {
        this.salarioService.addSalario(this.salario).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Salário Criado', life: 3000 });
            this.loadSalarios();
            this.salarioDialog = false;
          },
          error: (error) => {
            console.error('Erro ao criar salário:', error);
          }
        });
      }
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.salarios.length; i++) {
      if (this.salarios[i].Id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}