import { Component, OnInit } from '@angular/core';
import { NacionalidadeService } from '../../../services/nacionalidade.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Nacionalidade } from '../../interface/nacionalidade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nacionalidade',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, DialogModule],
  templateUrl: './nacionalidade.component.html',
  styleUrls: ['./nacionalidade.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class NacionalidadeComponent implements OnInit {

  nacionalidades: Nacionalidade[] = [];
  nacionalidadeDialog: boolean = false;
  nacionalidade: Nacionalidade = { Id: 0, NomeNacionalidade: '' };
  submitted: boolean = false;

  constructor(
    private nacionalidadeService: NacionalidadeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadNacionalidades();
  }

  loadNacionalidades() {
    this.nacionalidadeService.getNacionalidades().subscribe({
      next: (data) => {
        this.nacionalidades = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar nacionalidades' });
        console.error('Erro ao carregar nacionalidades:', error);
      }
    });
  }

  openNew() {
    this.nacionalidade = { Id: 0, NomeNacionalidade: '' };
    this.submitted = false;
    this.nacionalidadeDialog = true;
  }

  editNacionalidade(nacionalidade: Nacionalidade) {
    this.nacionalidade = { ...nacionalidade };
    this.nacionalidadeDialog = true;
  }

  deleteNacionalidade(nacionalidade: Nacionalidade) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + nacionalidade.NomeNacionalidade + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.nacionalidadeService.deleteNacionalidade(nacionalidade.Id).subscribe({
          next: () => {
            this.nacionalidades = this.nacionalidades.filter(val => val.Id !== nacionalidade.Id);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Nacionalidade Deletada', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a nacionalidade ' + nacionalidade.NomeNacionalidade, life: 3000 });
            console.error('Erro ao deletar nacionalidade:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.nacionalidadeDialog = false;
    this.submitted = false;
  }

  saveNacionalidade() {
    this.submitted = true;

    if (this.nacionalidade.NomeNacionalidade?.trim()) {
      this.nacionalidade.NomeNacionalidade = this.nacionalidade.NomeNacionalidade.toUpperCase();
      if (this.nacionalidade.Id) {
        this.nacionalidadeService.updateNacionalidade(this.nacionalidade.Id, this.nacionalidade).subscribe({
          next: () => {
            this.nacionalidades[this.findIndexById(this.nacionalidade.Id)] = this.nacionalidade;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Nacionalidade Atualizada', life: 3000 });
            this.loadNacionalidades();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a nacionalidade ' + this.nacionalidade.NomeNacionalidade, life: 3000 });
            console.error('Erro ao atualizar nacionalidade:', error);
          }
        });
      } else {
        this.nacionalidadeService.addNacionalidade(this.nacionalidade).subscribe({
          next: (data) => {
            this.nacionalidades.push(data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Nacionalidade Criada', life: 3000 });
            this.loadNacionalidades();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar a nacionalidade ' + this.nacionalidade.NomeNacionalidade, life: 3000 });
            console.error('Erro ao criar nacionalidade:', error);
          }
        });
      }

      this.nacionalidades = [...this.nacionalidades];
      this.nacionalidadeDialog = false;
      this.nacionalidade = { Id: 0, NomeNacionalidade: '' };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.nacionalidades.length; i++) {
      if (this.nacionalidades[i].Id === Id) {
        index = i;
        break;
      }
    }

    return index;
  }
}