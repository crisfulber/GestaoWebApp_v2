import { Component, Input, OnInit, Output, EventEmitter, Inject, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Not used, consider removing
import { ConfigService, CampoConfig } from '../../../services/config.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { INestedService } from '../../../services/inested.service';
import { NESTED_SERVICE_TOKEN } from '../../../services/nested.service.token';
// Removed HttpHeaders import as it's not used

@Component({
    selector: 'app-generic-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AutoCompleteModule, DialogModule, InputTextModule, ButtonModule, DropdownModule, CalendarModule, ToastModule],
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss'],
    providers: [MessageService]
})
export class GenericFormComponent implements OnInit {
    @Output() onFormHide = new EventEmitter<any>(); // Specify type for event emitter
    @Input() showHeader = true;
    @Input() key: any; // Consider a more specific type if possible
    @Input() visible = false;
    @Input() itemSelecionado: any; // Consider a more specific type if possible
    titulo = '';
    campos: CampoConfig[] = [];
    endpoint = '';
    private _modelo = '';
    form: FormGroup;
    filteredOptions: any[] = []; // Consider a more specific type if possible
    private _id: number | null = null;
    loading = false; // Add loading indicator

    constructor(
        private fb: FormBuilder,
        @Inject(NESTED_SERVICE_TOKEN) private nestedService: INestedService,
        private configService: ConfigService,
        private messageService: MessageService,
    ) {
        this.form = this.fb.group({});
    }

    @Input()
    set id(value: number | null) {
        this._id = value;
        if (value) { // Only call if value is not null or undefined
            this.buscarDadosPorId(value);
        } else {
            this.form.reset(); // Clear form if ID is null
        }
    }

    get id(): number | null {
        return this._id;
    }

    @Input()
    set modelo(value: string) {
        this._modelo = value;
    }

    get modelo(): string {
        return this._modelo;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['modelo'] && this.modelo) {
            this.loadConfig();
        }

        if (changes['itemSelecionado'] && this.itemSelecionado) {
            this.form.patchValue(this.itemSelecionado);
        }
    }

    ngOnInit(): void {
        if (this.modelo) { // Load config if modelo is already set on init
            this.loadConfig();
        }
    }

    private loadConfig() {
        const configuracao = this.configService.getConfiguracao(this.modelo);
        if (configuracao) {
            this.campos = configuracao.campos;
            this.titulo = configuracao.titulo;
            this.endpoint = configuracao.endpoint;
            this.initializeForm();
        } else {
            console.error(`Configuração para o modelo "${this.modelo}" não encontrada.`);
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Configuração para o modelo "${this.modelo}" não encontrada.` });
        }
    }


    buscarDadosPorId(id: number): void {
        this.loading = true; // Show loading indicator
        this.nestedService.getById(this.endpoint, id).subscribe({
            next: data => {
                this.form.patchValue(data);
            },
            error: error => {
                console.error('Erro ao carregar dados:', error);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados.' });
            },
            complete: () => this.loading = false // Hide loading indicator
        });
    }

    initializeForm(): void {
        this.form.reset(); // Clear existing form controls
        this.campos.forEach(campo => {
            this.form.addControl(campo.campo, new FormControl('', campo.tipo === 'select' ? Validators.required : null));
            if (campo.tipo === 'select' && campo.optionsEndpoint) {
                this.loadSelectOptions(campo);
            }
        });
    }

    private loadSelectOptions(campo: CampoConfig) {
        if (campo.optionsEndpoint) { // Check if optionsEndpoint is defined
            this.nestedService.getAll(campo.optionsEndpoint).subscribe({
                next: data => {
                    this.filteredOptions = data.map(item => {
                        const labelField = campo.labelField ?? '';
                        const valueField = campo.valueField ?? '';

                        let label = item[labelField as keyof typeof item] ?? '';
                        const value = item[valueField as keyof typeof item];

                        if (campo.concatFields) {
                            campo.concatFields.forEach(field => {
                                const fieldValue = item[field ?? '' as keyof typeof item] ?? '';
                                if (fieldValue) {
                                    label += ` (${fieldValue})`;
                                }
                            });
                        }

                        return value ? { label, value } : null;
                    }).filter(option => option !== null);
                },
                error: error => {
                    console.error(`Erro ao carregar opções para ${campo.campo}:`, error);
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao carregar opções para ${campo.label}.` });
                }
            });
        } else {
            console.warn(`optionsEndpoint is not defined for field ${campo.campo}.`);
            // Optionally, you could set filteredOptions to an empty array here if you want to avoid displaying anything for this select:
            // this.filteredOptions = [];
        }
    }


    onHide(): void {
        this.onFormHide.emit(null);
        this.form.reset(); // Reset form on hide
        this._id = null; // Reset ID as well
    }

    cancelar(): void {
        this.onHide();
    }

    salvar(): void {
        if (this.form.valid) {
            this.loading = true; // Show loading indicator
            const formData = { ...this.form.value };

            this.campos.forEach(campo => {
                if (campo.tipo === 'select' && formData[campo.campo] && formData[campo.campo].value) {
                    formData[`Id${campo.label}`] = formData[campo.campo].value;
                    delete formData[campo.campo];
                }
            });

            const request = this.id
                ? this.nestedService.update(this.endpoint, this.id, formData)
                : this.nestedService.create(this.endpoint, formData);

            request.subscribe({
                next: response => {
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Dados salvos com sucesso!' });
                    this.onHide(); // Hide and reset the form after successful save
                },
                error: error => {
                    console.error('Erro ao salvar dados:', error);
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar os dados, verifique e tente novamente' });
                },
                complete: () => this.loading = false // Hide loading indicator
            });

        } else {
            this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Preencha todos os campos corretamente' });
        }
    }

    filterOptions(event: any): void {
        const query = event.query.toLowerCase();
        this.filteredOptions = this.filteredOptions.filter(option =>
            option?.label?.toLowerCase().includes(query) // Safe navigation operator
        );
    }
}