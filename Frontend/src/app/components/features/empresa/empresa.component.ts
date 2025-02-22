import { Component, OnInit } from '@angular/core';
import { EmpresaService, EmpresaDto } from '../../../services/empresa.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../interface/empresa';
import { DropdownModule } from 'primeng/dropdown';
import { MunicipioService } from '../../../services/municipio.service';
import { Municipio } from '../../interface/municipio';
import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../interface/estado';

@Component({
    selector: 'app-empresa',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule,
        InputMaskModule, ToastModule, ConfirmDialogModule, TableModule, ToolbarModule, StepsModule,
        DialogModule, DropdownModule],
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class EmpresaComponent implements OnInit {

    empresas: Empresa[] = [];
    empresaDialog: boolean = false;
    empresa: Empresa = { 
        Id: 1,
        NomeEmpresa: '',
        CNPJ_CEI: '',
        IdEndereco: null,
        IdContato: null,
    };
    submitted: boolean = false;
    formSteps: FormGroup[] = [];

    steps: MenuItem[] = [];
    activeIndex: number = 0;
    municipios: Municipio[] = [];
    estados: Estado[] = [];

    constructor(
        private empresaService: EmpresaService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private municipioService: MunicipioService,
        private estadoService: EstadoService,
    ) {
        this.formSteps = [
            this.fb.group({
                NomeEmpresa: ['', Validators.required],
                CNPJ_CEI: ['', Validators.required]
            }),
            this.fb.group({
                Rua: ['', Validators.required],
                Numero: ['', Validators.required],
                Complemento: [''],
                Bairro: ['', Validators.required],
                CEP: ['', Validators.required],
                IdMunicipio: [null, Validators.required],
                IdEstado: [null, Validators.required]
            }),
            this.fb.group({
                Telefone: [''],
                Email: ['']
            })
        ];
    }

    ngOnInit() {
        this.loadEmpresas();
        this.loadMunicipios();
        this.loadEstados();

        this.steps = [
            { label: 'Informações da Empresa' },
            { label: 'Endereço' },
            { label: 'Contato' }
        ];
    }

    loadMunicipios() {
        this.municipioService.getMunicipios().subscribe({
            next: (data) => {
                this.municipios = data;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar municípios' });
                console.error('Erro ao carregar municípios:', error);
            }
        });
    }

    loadEstados() {
        this.estadoService.getEstados().subscribe({
            next: (data) => {
                this.estados = data;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar estados' });
                console.error('Erro ao carregar estados:', error);
            }
        });
    }

    loadEmpresas() {
        this.empresaService.getEmpresas().subscribe({
            next: (data) => {
                this.empresas = data;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar empresas' });
                console.error('Erro ao carregar empresas:', error);
            }
        });
    }

    openNew() {
        this.empresa = {
            Id: 0,
            NomeEmpresa: '',
            CNPJ_CEI: '',
            IdEndereco: null,
            IdContato: null
        };
        this.submitted = false;
        this.empresaDialog = true;
        this.formSteps.forEach(form => form.reset()); 
        this.activeIndex = 0;
    }

    editEmpresa(empresa: Empresa) {
        this.empresa = { ...empresa };
        this.empresaDialog = true;
        this.formSteps[0].patchValue({
            NomeEmpresa: empresa.NomeEmpresa,
            CNPJ_CEI: empresa.CNPJ_CEI,
        });
        if (empresa.Endereco) {
            this.formSteps[1].patchValue({
                Rua: empresa.Endereco.Rua,
                Numero: empresa.Endereco.Numero,
                Bairro: empresa.Endereco.Bairro,
                CEP: empresa.Endereco.CEP,
                IdMunicipio: empresa.Endereco.IdMunicipio,
                IdEstado: empresa.Endereco.IdEstado,
                Complemento: empresa.Endereco.Complemento
            });
        }
        if (empresa.Contato) {
            this.formSteps[2].patchValue({
                Telefone: empresa.Contato.Telefone,
                Email: empresa.Contato.Email
            });
        }
        this.activeIndex = 0;
    }

    deleteEmpresa(empresa: Empresa) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar ' + empresa.NomeEmpresa + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.empresaService.deleteEmpresa(empresa.Id).subscribe({
                    next: () => {
                        this.empresas = this.empresas.filter(val => val.Id !== empresa.Id);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empresa Deletada', life: 3000 });
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar a empresa ' + empresa.NomeEmpresa, life: 3000 });
                        console.error('Erro ao deletar empresa:', error);
                    }
                });
            }
        });
    }

    hideDialog() {
        this.empresaDialog = false;
        this.submitted = false;
    }

    nextPage() {
        if (this.formSteps[this.activeIndex].valid) {
            this.activeIndex = this.activeIndex + 1;
        }
        else {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Preencha todos os campos corretamente', life: 3000 });
        }
    }

    prevPage() {
        this.activeIndex = this.activeIndex - 1;
    }

    saveEmpresa() {
        this.submitted = true;
        if (this.formSteps.every(form => form.valid)) {

            const formData: EmpresaDto = {
                NomeEmpresa: this.formSteps[0].get('NomeEmpresa')?.value,
                CNPJ_CEI: this.formSteps[0].get('CNPJ_CEI')?.value,
                Rua: this.formSteps[1].get('Rua')?.value,
                Numero: this.formSteps[1].get('Numero')?.value,
                Bairro: this.formSteps[1].get('Bairro')?.value,
                CEP: this.formSteps[1].get('CEP')?.value,
                Complemento: this.formSteps[1].get('Complemento')?.value,
                IdMunicipio: this.formSteps[1].get('IdMunicipio')?.value,
                IdEstado: this.formSteps[1].get('IdEstado')?.value,
                Telefone: this.formSteps[2].get('Telefone')?.value,
                Email: this.formSteps[2].get('Email')?.value
            };

            if (this.empresa.Id) {
                this.empresaService.updateEmpresa(this.empresa.Id, formData).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empresa Atualizada', life: 3000 });
                        this.loadEmpresas();
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar a empresa ' + this.empresa.NomeEmpresa, life: 3000 });
                        console.error('Erro ao atualizar empresa:', error);
                    }
                });
            } else {
                this.empresaService.addEmpresa(formData).subscribe({
                    next: (data) => {
                        this.empresas.push(data);
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Empresa Criada', life: 3000 });
                        this.loadEmpresas();
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar a empresa ' + this.empresa.NomeEmpresa, life: 3000 });
                        console.error('Erro ao criar empresa:', error);
                    }
                });
            }

            this.empresas = [...this.empresas];
            this.empresaDialog = false;
            this.empresa = {
                Id: 0,
                NomeEmpresa: '',
                CNPJ_CEI: '',
                IdEndereco: null,
                IdContato: null
            };
            this.activeIndex = 0;
        } else {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Formulário incompleto', life: 3000 });
        }
    }

    findIndexById(Id: number): number {
        let index = -1;
        for (let i = 0; i < this.empresas.length; i++) {
            if (this.empresas[i].Id === Id) {
                index = i;
                break;
            }
        }

        return index;
    }
}