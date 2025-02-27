import { Component, OnInit } from '@angular/core';
import { SetorService } from '../../../services/setor.service';
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
import { Setor } from '../../interface/setor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown'; 
import { UnidadeService } from '../../../services/unidade.service'; 
import { Unidade } from '../../interface/unidade'; 

@Component({
  selector: 'app-setor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
    ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, DialogModule, DropdownModule], 
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SetorComponent implements OnInit {

  setores: Setor[] = [];
  setorDialog: boolean = false;
  setor: Setor = { Id: 0, NomeSetor: '', IdUnidade: 0 };
  submitted: boolean = false;
  unidades: Unidade[] = []; 

  constructor(
    private setorService: SetorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private unidadeService: UnidadeService 
  ) { }

  ngOnInit() {
    this.loadSetores();
    this.loadUnidades(); 
  }

  loadSetores() {
    this.setorService.getSetores().subscribe({
      next: (data) => {
        this.setores = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar setores' });
        console.error('Erro ao carregar setores:', error);
      }
    });
  }

  loadUnidades() {
    this.unidadeService.getUnidades().subscribe({ 
      next: (data) => {
        this.unidades = data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar unidades' });
        console.error('Erro ao carregar unidades:', error);
      }
    });
  }

  openNew() {
    this.setor = { Id: 0, NomeSetor: '', IdUnidade: 0 };
    this.submitted = false;
    this.setorDialog = true;
  }

  editSetor(setor: Setor) {
    this.setor = { ...setor };
    this.setorDialog = true;
  }

  deleteSetor(setor: Setor) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar ' + setor.NomeSetor + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.setorService.deleteSetor(setor.Id).subscribe({
          next: () => {
            this.setores = this.setores.filter(val => val.Id !== setor.Id);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Setor Deletado', life: 3000 });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o setor ' + setor.NomeSetor, life: 3000 });
            console.error('Erro ao deletar setor:', error);
          }
        });
      }
    });
  }

  hideDialog() {
    this.setorDialog = false;
    this.submitted = false;
  }

  saveSetor() {
    this.submitted = true;

    if (this.setor.NomeSetor?.trim() && this.setor.IdUnidade) {
      this.setor.NomeSetor = this.setor.NomeSetor.toUpperCase();
      
      if (this.setor.Id) {
        this.setorService.updateSetor(this.setor.Id, this.setor).subscribe({
          next: () => {
            this.setores[this.findIndexById(this.setor.Id)] = this.setor;
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Setor Atualizado', life: 3000 });
            this.loadSetores();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o setor ' + this.setor.NomeSetor, life: 3000 });
            console.error('Erro ao atualizar setor:', error);
          }
        });
      } else {
        this.setorService.addSetor(this.setor).subscribe({
          next: (data) => {
            this.setores.push(data);
            this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Setor Criado', life: 3000 });
            this.loadSetores();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o setor ' + this.setor.NomeSetor, life: 3000 });
            console.error('Erro ao criar setor:', error);
          }
        });
      }

      this.setores = [...this.setores];
      this.setorDialog = false;
      this.setor = { Id: 0, NomeSetor: '', IdUnidade: 0 };
    }
  }

  findIndexById(Id: number): number {
    let index = -1;
    for (let i = 0; i < this.setores.length; i++) {
      if (this.setores[i].Id === Id) {
        index = i;
        break;
      }
    }

    return index;
  }
}