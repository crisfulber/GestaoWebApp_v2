import { Component, OnInit } from '@angular/core';
import { DependenteService } from '../../../services/dependente.service';
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
import { Dependente } from '../../interface/dependente';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-dependente',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
    ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, InputMaskModule],
  templateUrl: './dependente.component.html',
  styleUrls: ['./dependente.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DependenteComponent implements OnInit {

  dependentes: Dependente[] = [];
  dependenteDialog: boolean = false;
  dependente: Dependente = {
    Id: 0,
    NomeDependente: '',
    CPF: '',
    DtNascimento: null
  };
  submitted: boolean = false;

  constructor(
    private dependenteService: DependenteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadDependentes();
  }

  loadDependentes() {
    this.dependenteService.getDependentes().subscribe({
      next: (data) => {
        data.forEach(x => {
          x.DtNascimento = this.formatarDataParaTela(x.DtNascimento)
        });
        this.dependentes = data;
      }
    })
  }

  openNew() {
    this.dependente = {
      Id: 0,
      NomeDependente: '',
      CPF: '',
      DtNascimento: null
    };
    this.submitted = false;
    this.dependenteDialog = true;
  }

  editDependente(dependente: Dependente) {
    this.dependenteDialog = true;
    this.dependente = { ...dependente };

    if (this.dependente.DtNascimento) {
      this.dependente.DtNascimento = this.formatarDataParaTela(this.dependente.DtNascimento);
    }
  }

  formatarDataParaTela(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const regexISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    if (regexISO.test(data)) {
      const dataSemHora = data.split('T')[0];
      const parts = dataSemHora.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    const regexDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;
    if (regexDDMMYYYY.test(data)) {
      return data;
    }

    console.error("Formato de data inválido:", data);
    return data;
  }

  formatarDataParaBanco(data: string | null | undefined): string | null {
    if (!data) {
      return null;
    }

    const regexYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
    if (regexYYYYMMDD.test(data)) {
      return data;
    }

    const parts = data.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    console.error("Formato de data inválido para envio ao banco:", data);
    return data;
  }

  deleteDependente(dependente: Dependente) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar o dependente com CPF ' + dependente.CPF + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dependenteService.deleteDependente(dependente.Id).subscribe({
          next: () => {
            this.dependentes = this.dependentes.filter(val => val.Id !== dependente.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dependente Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o dependente com CPF ' + dependente.CPF, life: 3000 });
            console.error('Erro ao deletar dependente:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.dependenteDialog = false;
    this.submitted = false;
  }

  saveDependente() {
    if (this.dependente) {
      this.dependente.DtNascimento = this.formatarDataParaBanco(this.dependente.DtNascimento);

      if (this.dependente.Id) {
        this.dependenteService.updateDependente(this.dependente.Id, this.dependente).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Dependente atualizado com sucesso' });
            this.loadDependentes();
            this.dependenteDialog = false;
          },
          error: (err) => {
            console.error('Erro ao atualizar dependente:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar dependente' });
          }
        });

      } else {
        this.dependenteService.addDependente(this.dependente).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Dependente criado com sucesso' });
            this.loadDependentes();
            this.dependenteDialog = false;
          },
          error: (err) => {
            console.error('Erro ao criar dependente:', err);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar dependente' });
          }
        });
      }
    }
  }

  findIndexById(Id: number): number {
    let index = -1; for (let i = 0; i < this.dependentes.length; i++) {
      if (this.dependentes[i].Id === Id) {
        index = i;
        break;
      }
    }
    return index;
  }
}