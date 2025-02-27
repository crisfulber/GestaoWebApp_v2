import { Component, OnInit } from '@angular/core';
import { EstadoCivilService } from '../../../services/estadoCivil';
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
import { EstadoCivil } from '../../interface/estadoCivil';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadocivil',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, DialogModule],
  templateUrl: './estadocivil.component.html',
  styleUrls: ['./estadocivil.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EstadoCivilComponent implements OnInit {

  estadoscivis: EstadoCivil[] = [];
  estadocivilDialog: boolean = false;
  estadocivil: EstadoCivil = { Id: 0, SituacaoCivil: '' };
  submitted: boolean = false;

  constructor(
    private estadocivilService: EstadoCivilService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadEstadosCivis();
  }

  loadEstadosCivis() {
    this.estadocivilService.getEstadosCivis().subscribe({
      next: (data) => {
        this.estadoscivis = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar estadoscivis' });
        console.error('Erro ao carregar estadoscivis:', error);
      }
    });
  }

  openNew() {
    this.estadocivil = { Id: 0, SituacaoCivil: '' };
    this.submitted = false;
    this.estadocivilDialog = true;
  }

  editEstadoCivil(estadocivil: EstadoCivil) {
    this.estadocivil = { ...estadocivil };
    this.estadocivilDialog = true;
  }

  deleteEstadoCivil(estadocivil: EstadoCivil) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + estadocivil.SituacaoCivil + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.estadocivilService.deleteEstadoCivil(estadocivil.Id).subscribe({
          next: () => {
            this.estadoscivis = this.estadoscivis.filter(val => val.Id !== estadocivil.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'EstadoCivil Deletada', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a estadocivil ' + estadocivil.SituacaoCivil, life: 3000 });
            console.error('Erro ao deletar estadocivil:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.estadocivilDialog = false;
    this.submitted = false;
  }

  saveEstadoCivil() {
    this.submitted = true;

    if (this.estadocivil.SituacaoCivil?.trim()) {
      this.estadocivil.SituacaoCivil = this.estadocivil.SituacaoCivil.toUpperCase();
      if (this.estadocivil.Id) {
        this.estadocivilService.updateEstadoCivil(this.estadocivil.Id, this.estadocivil).subscribe({
          next: () => {
            this.estadoscivis[this.findIndexById(this.estadocivil.Id)] = this.estadocivil;
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'EstadoCivil Atualizada', life: 3000 });
            this.loadEstadosCivis();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a estadocivil ' + this.estadocivil.SituacaoCivil, life: 3000 });
            console.error('Erro ao atualizar estadocivil:', error);
          }
        });
      } else {
        this.estadocivilService.addEstadoCivil(this.estadocivil).subscribe({
          next: (data) => {
            this.estadoscivis.push(data);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'EstadoCivil Criada', life: 3000 });
            this.loadEstadosCivis();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar a estadocivil ' + this.estadocivil.SituacaoCivil, life: 3000 });
            console.error('Erro ao criar estadocivil:', error);
          }
        });
      }

      this.estadoscivis = [...this.estadoscivis];
      this.estadocivilDialog = false;
      this.estadocivil = { Id: 0, SituacaoCivil: '' };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.estadoscivis.length; i++) {
      if (this.estadoscivis[i].Id === Id) {
        index = i;
        break;
      }
    }

    return index;
  }
}