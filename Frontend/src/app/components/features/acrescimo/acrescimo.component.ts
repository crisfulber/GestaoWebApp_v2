import { Component, OnInit } from '@angular/core';
import { AcrescimoService } from '../../../services/acrescimo.service';
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
import { Acrescimo } from '../../interface/acrescimo';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { Pessoa } from '../../interface/pessoa';
import { PessoaService } from '../../../services/pessoa.service';

@Component({
  selector: 'app-acrescimo',
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
  templateUrl: './acrescimo.component.html',
  styleUrls: ['./acrescimo.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AcrescimoComponent implements OnInit {

  acrescimos: Acrescimo[] = [];
  acrescimoDialog: boolean = false;
  acrescimo: Acrescimo = { Id: 0 };
  submitted: boolean = false;
  pessoas: Pessoa[] = [];

  constructor(
    private acrescimoService: AcrescimoService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadAcrescimos();
    this.loadPessoas();
  }

  loadAcrescimos() {
    this.acrescimoService.getAcrescimos().subscribe({
      next: (data) => {
        this.acrescimos = data.map(ad => {
          if (ad.Data) {
            ad.Data = new Date(ad.Data);
          }
          return ad;
        });
      },
      error: (err) => {
        console.error('Erro ao carregar acrescimos:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar acrescimos' });
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
    this.acrescimo = { Id: 0 };
    this.submitted = false;
    this.acrescimoDialog = true;
  }

  editAcrescimo(acrescimo: Acrescimo) {
    this.acrescimoDialog = true;
    this.acrescimo = { ...acrescimo };
  }

  deleteAcrescimo(acrescimo: Acrescimo) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o acrescimo?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.acrescimoService.deleteAcrescimo(acrescimo.Id).subscribe({
          next: () => {
            this.acrescimos = this.acrescimos.filter(val => val.Id !== acrescimo.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Acrescimo Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o acrescimo', life: 3000 });
            console.error('Erro ao deletar acrescimo:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.acrescimoDialog = false;
    this.submitted = false;
  }

  saveAcrescimo() {
    this.submitted = true;

    if (!this.acrescimo.IdPessoa) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'IdPessoa é obrigatório.' });
      return;
    }

    if (this.acrescimo.Id && this.acrescimo.Id > 0) {
      this.acrescimoService.updateAcrescimo(this.acrescimo.Id, this.acrescimo).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Acrescimo atualizado com sucesso' });
          this.loadAcrescimos();
          this.acrescimoDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar acrescimo:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar acrescimo' });
        }
      });
    } else {
      this.acrescimoService.addAcrescimo(this.acrescimo).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Acrescimo criado com sucesso' });
          this.loadAcrescimos();
          this.acrescimoDialog = false;
        },
        error: (err) => {
          console.error('Erro ao criar acrescimo:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar acrescimo' });
        }
      });
    }
  }

}
