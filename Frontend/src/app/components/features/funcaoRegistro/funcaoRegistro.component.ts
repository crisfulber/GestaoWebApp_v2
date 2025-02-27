import { Component, OnInit } from '@angular/core';
import { FuncaoRegistroService } from '../../../services/funcaoRegistro.service';
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
import { FuncaoRegistro } from '../../interface/funcaoRegistro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-funcao-registro',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
        ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, DialogModule],
    templateUrl: './funcaoRegistro.component.html',
    styleUrls: ['./funcaoRegistro.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class FuncaoRegistroComponent implements OnInit {

    funcaoRegistros: FuncaoRegistro[] = [];
    funcaoRegistroDialog: boolean = false;
    funcaoRegistro: FuncaoRegistro = { Id: 0, Funcao: '', CBO: 0 };
    submitted: boolean = false;

    constructor(
        private funcaoRegistroService: FuncaoRegistroService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.loadFuncaoRegistros();
    }

    loadFuncaoRegistros() {
        this.funcaoRegistroService.getFuncaoRegistros().subscribe({
            next: (data) => {
                this.funcaoRegistros = data;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar registros de funções' });
                console.error('Erro ao carregar registros de funções:', error);
            }
        });
    }

    openNew() {
        this.funcaoRegistro = { Id: 0, Funcao: '', CBO: 0 };
        this.submitted = false;
        this.funcaoRegistroDialog = true;
    }

    editFuncaoRegistro(funcaoRegistro: FuncaoRegistro) {
        this.funcaoRegistro = { ...funcaoRegistro };
        this.funcaoRegistroDialog = true;
    }

    deleteFuncaoRegistro(funcaoRegistro: FuncaoRegistro) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar ' + funcaoRegistro.Funcao + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.funcaoRegistroService.deleteFuncaoRegistro(funcaoRegistro.Id).subscribe({
                    next: () => {
                        this.funcaoRegistros = this.funcaoRegistros.filter(val => val.Id !== funcaoRegistro.Id);
                        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Registro de Função Deletado', life: 3000 });
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o registro de função ' + funcaoRegistro.Funcao, life: 3000 });
                        console.error('Erro ao deletar registro de função:', error);
                    }
                });
            }
        });
    }

    hideDialog() {
        this.funcaoRegistroDialog = false;
        this.submitted = false;
    }

    saveFuncaoRegistro() {
        this.submitted = true;

        if (this.funcaoRegistro.Funcao?.trim() && this.funcaoRegistro.CBO) {
          this.funcaoRegistro.Funcao = this.funcaoRegistro.Funcao.toUpperCase();
            if (this.funcaoRegistro.Id) {
                this.funcaoRegistroService.updateFuncaoRegistro(this.funcaoRegistro.Id, this.funcaoRegistro).subscribe({
                    next: () => {
                        this.funcaoRegistros[this.findIndexById(this.funcaoRegistro.Id)] = this.funcaoRegistro;
                        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Registro de Função Atualizado', life: 3000 });
                        this.loadFuncaoRegistros();
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o registro de função ' + this.funcaoRegistro.Funcao, life: 3000 });
                        console.error('Erro ao atualizar registro de função:', error);
                    }
                });
            } else {
                this.funcaoRegistroService.addFuncaoRegistro(this.funcaoRegistro).subscribe({
                    next: (data) => {
                        this.funcaoRegistros.push(data);
                        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Registro de Função Criado', life: 3000 });
                        this.loadFuncaoRegistros();
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o registro de função ' + this.funcaoRegistro.Funcao, life: 3000 });
                        console.error('Erro ao criar registro de função:', error);
                    }
                });
            }

            this.funcaoRegistros = [...this.funcaoRegistros];
            this.funcaoRegistroDialog = false;
            this.funcaoRegistro = { Id: 0, Funcao: '', CBO: 0 };
        }
    }

    findIndexById(Id: number): number {
        let index = -1;
        for (let i = 0; i < this.funcaoRegistros.length; i++) {
            if (this.funcaoRegistros[i].Id === Id) {
                index = i;
                break;
            }
        }

        return index;
    }
}