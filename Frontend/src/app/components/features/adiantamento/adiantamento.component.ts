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
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { Adiantamento } from '../../interface/adiantamento';
import { AdiantamentoService } from '../../../services/adiantamento.service';
import { Pessoa } from '../../interface/pessoa';
import { PessoaService } from '../../../services/pessoa.service';
import { DropdownModule } from 'primeng/dropdown';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-adiantamento',
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
    DatePickerModule
  ],
  templateUrl: './adiantamento.component.html',
  styleUrls: ['./adiantamento.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdiantamentoComponent implements OnInit {

  adiantamentos: Adiantamento[] = [];

  adiantamentoDialog: boolean = false;

  adiantamento: Adiantamento = { Id: 0 };

  pessoas: Pessoa[] = [];

  submitted: boolean = false;

  constructor(
    private AdiantamentoService: AdiantamentoService,
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadAdiantamentos();
    this.loadPessoas();
  }

  loadAdiantamentos() {
    this.AdiantamentoService.getAdiantamentos().subscribe({
      next: (data) => {
        this.adiantamentos = data.map(ad => {
          if (ad.Data) {
            ad.Data = new Date(ad.Data);
          }
          return ad;
        });
      },
      error: (err) => {
        console.error('Erro ao carregar Adiantamentos:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar Adiantamentos' });
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

  getPessoaNome(idPessoa?: number): string {
    if (!idPessoa) return '';
    const pessoa = this.pessoas.find((p) => p.Id === idPessoa);
    return pessoa ? pessoa.NomePessoa ?? '' : '';
  }

  openNew() {
    this.adiantamento = { Id: 0 };
    this.submitted = false;
    this.adiantamentoDialog = true;
  }

  editAdiantamento(adiantamento: Adiantamento) {
    this.adiantamentoDialog = true;
    this.adiantamento = { ...adiantamento };
  }

  deleteAdiantamento(Adiantamento: Adiantamento) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o Adiantamento?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AdiantamentoService.deleteAdiantamento(Adiantamento.Id).subscribe({
          next: () => {
            this.adiantamentos = this.adiantamentos.filter(val => val.Id !== Adiantamento.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Adiantamento Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o Adiantamento', life: 3000 });
            console.error('Erro ao deletar Adiantamento:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.adiantamentoDialog = false;
    this.submitted = false;
  }

  saveAdiantamento() {
    this.submitted = true;

    if (!this.adiantamento.IdPessoa) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'IdPessoa é obrigatório.' });
      return;
    }

    if (this.adiantamento.Id && this.adiantamento.Id > 0) {
      this.AdiantamentoService.updateAdiantamento(this.adiantamento.Id, this.adiantamento).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adiantamento atualizado com sucesso' });
          this.loadAdiantamentos();
          this.adiantamentoDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar Adiantamento:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar Adiantamento' });
        }
      });
    } else {
      this.AdiantamentoService.addAdiantamento(this.adiantamento).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Adiantamento criado com sucesso' });
          this.loadAdiantamentos();
          this.adiantamentoDialog = false;
        },
        error: (err) => {
          console.error('Erro ao criar Adiantamento:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar Adiantamento' });
        }
      });
    }
  }
}
