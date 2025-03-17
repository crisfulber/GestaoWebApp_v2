import { Component, OnInit } from '@angular/core';
import { TipoHoraService } from '../../../services/tipo-hora.service';
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
import { TipoHora } from '../../interface/tipoHora';

@Component({
  selector: 'app-tipo-hora',
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
    InputNumberModule
  ],
  templateUrl: './tipo-hora.component.html',
  styleUrl: './tipo-hora.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class TipoHoraComponent implements OnInit {

    tiposHora: TipoHora[] = [];
    tipoHoraDialog: boolean = false;
    tipoHora: TipoHora = { Id: 0 };
    submitted: boolean = false;
  
    constructor(
      private tipoHoraService: TipoHoraService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
    ) {}
  
    ngOnInit(): void {
      this.loadTiposHora();
    }
  
    loadTiposHora() {
      this.tipoHoraService.getTiposHora().subscribe({
        next: (data) => {
          this.tiposHora = data;
        },
        error: (err) => {
          console.error('Erro ao carregar tipos de hora:', err);
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar tipos de hora' });
        }
      });
    }
  
    openNew() {
      this.tipoHora = { Id: 0 };
      this.submitted = false;
      this.tipoHoraDialog = true;
    }
  
    editTipoHora(th: TipoHora) {
      this.tipoHora = { ...th };
      this.tipoHoraDialog = true;
    }
  
    deleteTipoHora(th: TipoHora) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja deletar este TipoHora?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.tipoHoraService.deleteTipoHora(th.Id).subscribe({
            next: () => {
              this.tiposHora = this.tiposHora.filter(val => val.Id !== th.Id);
              this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'TipoHora Deletado', life: 3000 });
            },
            error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o TipoHora', life: 3000 });
              console.error('Erro ao deletar TipoHora:', error);
            }
          });
        }
      });
    }
  
    hideDialog() {
      this.tipoHoraDialog = false;
      this.submitted = false;
    }
  
    saveTipoHora() {
      this.submitted = true;
      if (!this.tipoHora.Descricao) {
        this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Descrição é obrigatória.' });
        return;
      }
  
      if (this.tipoHora.Id && this.tipoHora.Id > 0) {
        // Update
        this.tipoHoraService.updateTipoHora(this.tipoHora.Id, this.tipoHora).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'TipoHora atualizado com sucesso' });
            this.loadTiposHora();
            this.tipoHoraDialog = false;
          },
          error: (err) => {
            console.error('Erro ao atualizar TipoHora:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar TipoHora' });
          }
        });
      } else {
        // Create
        this.tipoHoraService.addTipoHora(this.tipoHora).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'TipoHora criado com sucesso' });
            this.loadTiposHora();
            this.tipoHoraDialog = false;
          },
          error: (err) => {
            console.error('Erro ao criar TipoHora:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar TipoHora' });
          }
        });
      }
    }
  }