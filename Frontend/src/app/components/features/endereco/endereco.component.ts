import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { EnderecoService } from '../../../services/endereco.service';
import { EstadoService } from '../../../services/estado.service';
import { MunicipioService } from '../../../services/municipio.service';
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
import { DropdownModule } from 'primeng/dropdown';
import { Endereco } from '../../interface/endereco';
import { Municipio } from '../../interface/municipio';
import { Estado } from '../../interface/estado';

@Component({
    selector: 'app-endereco',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, DialogModule,
        ConfirmDialogModule, ToastModule, TableModule, ToolbarModule, DropdownModule],
    templateUrl: './endereco.component.html',
    styleUrls: ['./endereco.component.css'],
    providers: [MessageService, ConfirmationService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class EnderecoComponent implements OnInit {

    enderecos: Endereco[] = [];
    estados: Estado[] = [];
    municipios: Municipio[] = [];
    enderecoDialog: boolean = false;
    endereco: Endereco = { Id: 0, Rua: '', Numero: 0, Bairro: '', IdMunicipio: null, IdEstado: null, CEP: '' };
    submitted: boolean = false;

    constructor(
        private enderecoService: EnderecoService,
        private estadoService: EstadoService,
        private municipioService: MunicipioService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit() {
        this.loadEnderecos();
        this.loadEstados();
        this.loadMunicipios();
    }

    loadEnderecos() {
        this.enderecoService.getEnderecos().subscribe({
            next: (data) => {
                this.enderecos = data;
            },
            error: (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar endereços' });
                console.error('Erro ao carregar endereços:', error);
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

    openNew() {
        this.endereco = { Id: 0, Rua: '', Numero: 0, Bairro: '', IdMunicipio: null, IdEstado: null, CEP: '' };
        this.submitted = false;
        this.enderecoDialog = true;
    }

    editEndereco(endereco: Endereco) {
        this.endereco = { ...endereco };
        this.enderecoDialog = true;
    }

    deleteEndereco(endereco: Endereco) {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja deletar o endereço ' + endereco.Rua + ', ' + endereco.Numero + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.enderecoService.deleteEndereco(endereco.Id).subscribe({
                    next: () => {
                        this.enderecos = this.enderecos.filter(val => val.Id !== endereco.Id);
                        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Endereço Deletado', life: 3000 });
                        this.loadEnderecos();
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar o endereço ' + endereco.Rua + ', ' + endereco.Numero, life: 3000 });
                        console.error('Erro ao deletar endereço:', error);
                    }
                });
            }
        });
    }

    hideDialog() {
        this.enderecoDialog = false;
        this.submitted = false;
    }

    saveEndereco() {
        this.submitted = true;

        if (!this.endereco.Rua?.trim()) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Rua é obrigatório.' });
            return;
        }
        if (!this.endereco.Bairro?.trim()) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Bairro é obrigatório.' });
            return;
        }
        if (!this.endereco.IdMunicipio) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Município é obrigatório.' });
            return;
        }
        if (!this.endereco.IdEstado) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Estado é obrigatório.' });
            return;
        }
        if (!this.endereco.CEP?.trim()) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'CEP é obrigatório.' });
            return;
        }

        this.endereco.Rua = this.endereco.Rua.toUpperCase();
        this.endereco.Bairro = this.endereco.Bairro.toUpperCase();

        const enderecoParaEnviar = {
            ...this.endereco,
            IdMunicipio: this.endereco.IdMunicipio,
            IdEstado: this.endereco.IdEstado === null ? 0 : this.endereco.IdEstado
        };

        if (this.endereco.Id) {
            this.enderecoService.updateEndereco(this.endereco.Id, enderecoParaEnviar as Endereco).subscribe({
                next: () => {
                    this.enderecos[this.findIndexById(this.endereco.Id)] = this.endereco;
                    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Endereço Atualizado', life: 3000 });
                    this.loadEnderecos();
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o endereço ' + this.endereco.Rua + ', ' + this.endereco.Numero, life: 3000 });
                    console.error('Erro ao atualizar endereço:', error);
                }
            });
        } else {
            this.enderecoService.addEndereco(enderecoParaEnviar as Endereco).subscribe({
                next: (data) => {
                    this.enderecos.push(data);
                    this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Endereço Criado', life: 3000 });
                    this.loadEnderecos();
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o endereço ' + this.endereco.Rua + ', ' + this.endereco.Numero, life: 3000 });
                    console.error('Erro ao criar endereço:', error);
                }
            });
        }

        this.enderecos = [...this.enderecos];
        this.enderecoDialog = false;
        this.endereco = { Id: 0, Rua: '', Numero: 0, Bairro: '', IdMunicipio: null, IdEstado: null, CEP: '' };
    }

    findIndexById(Id: number): number {
        let index = -1;
        for (let i = 0; i < this.enderecos.length; i++) {
            if (this.enderecos[i].Id === Id) {
                index = i;
                break;
            }
        }
        return index;
    }

    getEstadoSigla(idEstado: number): string {
        const estado = this.estados.find(e => e.Id === idEstado);
        return estado ? estado.Sigla : '';
    }

    getMunicipioNome(idMunicipio: number): string {
        const municipio = this.municipios.find(m => m.Id === idMunicipio);
        return municipio ? municipio.NomeMunicipio : '';
    }
}