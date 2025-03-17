import { Component, OnInit } from '@angular/core';
import { HoraExtraService } from '../../../services/hora-extra.service';
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
import { CalendarModule } from 'primeng/calendar';
import { HoraExtra } from '../../interface/horaExtra';
import { DropdownModule } from 'primeng/dropdown';
import { Pessoa } from '../../interface/pessoa';
import { PessoaService } from '../../../services/pessoa.service';
import { TipoHora } from '../../interface/tipoHora';
import { TipoHoraService } from '../../../services/tipo-hora.service';

@Component({
  selector: 'app-hora-extra',
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
    DropdownModule,
    CalendarModule
  ],
  templateUrl: './hora-extra.component.html',
  styleUrl: './hora-extra.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class HoraExtraComponent implements OnInit {

  horasExtras: HoraExtra[] = [];
  horaExtraDialog: boolean = false;
  horaExtra: HoraExtra = { Id: 0 };
  submitted: boolean = false;
  pessoas: Pessoa[] = [];
  tipoHoras: TipoHora[] = [];

  constructor(
    private horaExtraService: HoraExtraService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private tipoHoraService: TipoHoraService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadHorasExtras();
    this.loadPessoas();
    this.loadTipoHoras();
  }

  loadTipoHoras() {
    this.tipoHoraService.getTiposHora().subscribe({
      next: (data) => {
        this.tipoHoras = data;
      },
      error: (err) => {
        console.error('Erro ao carregar tipo horas:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar tipo horas' });
      }
    });
  }

  loadHorasExtras() {
    this.horaExtraService.getHorasExtras().subscribe({
      next: (data) => {
        this.horasExtras = data.map(ad => {
          if (ad.Data) {
            ad.Data = new Date(ad.Data);
          }
          return ad;
        });
      },
      error: (err) => {
        console.error('Erro ao carregar horas extras:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar horas extras' });
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
    this.horaExtra = { Id: 0 };
    this.submitted = false;
    this.horaExtraDialog = true;
  }

  editHoraExtra(he: HoraExtra) {
    this.horaExtra = { ...he };
    this.horaExtraDialog = true;
  }

  deleteHoraExtra(he: HoraExtra) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar esta Hora Extra?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.horaExtraService.deleteHoraExtra(he.Id).subscribe({
          next: () => {
            this.horasExtras = this.horasExtras.filter(val => val.Id !== he.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Hora Extra Deletada', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a Hora Extra', life: 3000 });
            console.error('Erro ao deletar Hora Extra:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.horaExtraDialog = false;
    this.submitted = false;
  }

  saveHoraExtra() {
    this.submitted = true;

    if (!this.horaExtra.IdPessoa) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'IdPessoa é obrigatório.' });
      return;
    }

    if (this.horaExtra.Id && this.horaExtra.Id > 0) {
      // Update
      this.horaExtraService.updateHoraExtra(this.horaExtra.Id, this.horaExtra).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Hora Extra atualizada com sucesso' });
          this.loadHorasExtras();
          this.horaExtraDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar Hora Extra:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar Hora Extra' });
        }
      });
    } else {
      // Create
      this.horaExtraService.addHoraExtra(this.horaExtra).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Hora Extra criada com sucesso' });
          this.loadHorasExtras();
          this.horaExtraDialog = false;
        },
        error: (err) => {
          console.error('Erro ao criar Hora Extra:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar Hora Extra' });
        }
      });
    }
  }

}