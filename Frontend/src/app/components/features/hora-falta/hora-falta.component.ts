import { Component, OnInit } from '@angular/core';
import { HoraFaltaService } from '../../../services/hora-falta.service';
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
import { HoraFalta } from '../../interface/horaFalta';
import { DropdownModule } from 'primeng/dropdown';
import { Pessoa } from '../../interface/pessoa';
import { PessoaService } from '../../../services/pessoa.service';
import { TipoHora } from '../../interface/tipoHora';
import { TipoHoraService } from '../../../services/tipo-hora.service';

@Component({
  selector: 'app-hora-falta',
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
  templateUrl: './hora-falta.component.html',
  styleUrl: './hora-falta.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class HoraFaltaComponent implements OnInit {

  horasFaltas: HoraFalta[] = [];
  horaFaltaDialog: boolean = false;
  horaFalta: HoraFalta = { Id: 0 };
  submitted: boolean = false;
  pessoas: Pessoa[] = [];
  tipoHoras: TipoHora[] = [];

  constructor(
    private horaFaltaService: HoraFaltaService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private tipoHoraService: TipoHoraService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadHorasFaltas();
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

  loadHorasFaltas() {
    this.horaFaltaService.getHorasFaltas().subscribe({
      next: (data) => {
        this.horasFaltas = data.map(ad => {
          if (ad.Data) {
            ad.Data = new Date(ad.Data);
          }
          return ad;
        });
      },
      error: (err) => {
        console.error('Erro ao carregar horas de falta:', err);
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar horas de falta' });
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
    this.horaFalta = { Id: 0 };
    this.submitted = false;
    this.horaFaltaDialog = true;
  }

  editHoraFalta(hf: HoraFalta) {
    this.horaFalta = { ...hf };
    this.horaFaltaDialog = true;
  }

  deleteHoraFalta(hf: HoraFalta) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar esta Hora de Falta?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.horaFaltaService.deleteHoraFalta(hf.Id).subscribe({
          next: () => {
            this.horasFaltas = this.horasFaltas.filter(val => val.Id !== hf.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Hora Falta Deletada', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a Hora Falta', life: 3000 });
            console.error('Erro ao deletar Hora Falta:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.horaFaltaDialog = false;
    this.submitted = false;
  }

  saveHoraFalta() {
    this.submitted = true;

    if (!this.horaFalta.IdPessoa) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'IdPessoa é obrigatório.' });
      return;
    }

    if (this.horaFalta.Id && this.horaFalta.Id > 0) {
      // Update
      this.horaFaltaService.updateHoraFalta(this.horaFalta.Id, this.horaFalta).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Hora Falta atualizada com sucesso' });
          this.loadHorasFaltas();
          this.horaFaltaDialog = false;
        },
        error: (err) => {
          console.error('Erro ao atualizar Hora Falta:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar Hora Falta' });
        }
      });
    } else {
      // Create
      this.horaFaltaService.addHoraFalta(this.horaFalta).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Hora Falta criada com sucesso' });
          this.loadHorasFaltas();
          this.horaFaltaDialog = false;
        },
        error: (err) => {
          console.error('Erro ao criar Hora Falta:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar Hora Falta' });
        }
      });
    }
  }

}