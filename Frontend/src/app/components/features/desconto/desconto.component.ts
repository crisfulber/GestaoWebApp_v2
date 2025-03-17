import { Component, OnInit } from '@angular/core';
import { DescontoService } from '../../../services/desconto.service';
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
import { Desconto } from '../../interface/desconto';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Pessoa } from '../../interface/pessoa';
import { PessoaService } from '../../../services/pessoa.service';

@Component({
  selector: 'app-desconto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    InputNumberModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule
  ],
  templateUrl: './desconto.component.html',
  styleUrls: ['./desconto.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DescontoComponent implements OnInit {

  descontos: Desconto[] = [];
  descontoDialog: boolean = false;
  desconto: Desconto = { Id: 0 };
  submitted: boolean = false;
  pessoas: Pessoa[] = [];

  constructor(
    private descontoService: DescontoService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadDescontos();
    this.loadPessoas();
  }

  loadDescontos() {
    this.descontoService.getDescontos().subscribe({
      next: (data) => {
        this.descontos = data.map(ad => {
          if (ad.Data) {
            ad.Data = new Date(ad.Data);
          }
          return ad;
        });
      },
      error: (err) => {
        console.error('Erro ao carregar descontos:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar descontos' });
      }
    });
  }

  loadPessoas() {
    this.pessoaService.getPessoas().subscribe({
      next: (pessoas) => {
        this.pessoas = pessoas;
      },
      error: (err) => {
        console.error('Erro ao carregar pessoas:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar a lista de Pessoas.' });
      }
    });
  }

  openNew() {
    this.desconto = { Id: 0 };
    this.submitted = false;
    this.descontoDialog = true;
  }

  editDesconto(desconto: Desconto) {
    this.descontoDialog = true;
    this.desconto = { ...desconto };
  }

  deleteDesconto(desconto: Desconto) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o desconto?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.descontoService.deleteDesconto(desconto.Id).subscribe({
          next: () => {
            this.descontos = this.descontos.filter(val => val.Id !== desconto.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Desconto Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o desconto', life: 3000 });
            console.error('Erro ao deletar desconto:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.descontoDialog = false;
    this.submitted = false;
  }

  saveDesconto() {
    this.submitted = true;

    if (!this.desconto.IdPessoa) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'IdPessoa é obrigatório.' });
      return;
    }

    if (this.desconto.Id && this.desconto.Id > 0) {
      this.descontoService.updateDesconto(this.desconto.Id, this.desconto).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Desconto atualizado com sucesso' });
          this.loadDescontos();
          this.descontoDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar desconto:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar desconto' });
        }
      });
    } else {
      this.descontoService.addDesconto(this.desconto).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Desconto criado com sucesso' });
          this.loadDescontos();
          this.descontoDialog = false;
        },
        error: (err) => {
          console.error('Erro ao criar desconto:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar desconto' });
        }
      });
    }
  }

}
