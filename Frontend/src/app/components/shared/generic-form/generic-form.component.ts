import { Component, Input, OnInit, Output, EventEmitter, Inject, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
    selector: 'app-generic-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AutoCompleteModule, DialogModule, InputTextModule, ButtonModule, DropdownModule, CalendarModule, ToastModule],
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss'],
    providers: [MessageService]
})
export class GenericFormComponent implements OnInit {
    @Output() visibleChange = new EventEmitter<boolean>();
    private _visible: boolean = false;

    @Input()
    set visible(value: boolean) {
        console.log('Visible Setter:', value);
        this._visible = value;
    }

    get visible(): boolean {
        return this._visible;
    }
    @Input() showHeader: boolean = true;
    titulo: string = '';
    campos: CampoConfig[] = [];
    endpoint: string = '';
    private _modelo: string = '';

    @Input()
    set modelo(value: string) {
        this._modelo = value;
        console.log('Modelo:', this._modelo);
    }

    get modelo(): string {
        console.log('Modelo Get:', this._modelo);
        return this._modelo;
    }
    form: FormGroup;
    filteredOptions: any[] = [];
    id: string | null = null;

    constructor(
        private fb: FormBuilder,
        @Inject(NESTED_SERVICE_TOKEN) private nestedService: INestedService,
        private route: ActivatedRoute,
        private router: Router,
        private configService: ConfigService,
        private messageService: MessageService
    ) {
        this.form = this.fb.group({});
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['modelo'] && this.modelo) {
            const configuracao = this.configService.getConfiguracao(this.modelo);
            if (configuracao) {
                this.campos = configuracao.campos;
                this.titulo = configuracao.titulo;
                this.endpoint = configuracao.endpoint;
                this.initializeForm();

                if (this.id) {
                    this.nestedService.getById(this.endpoint, +this.id).subscribe(data => {
                        this.form.patchValue(data);
                    });
                }
            } else {
                console.error(`Configuração para o modelo "${this.modelo}" não encontrada.`);
            }
        } else if (changes['modelo'] && !this.modelo) {
            console.error(`O modelo não foi definido.`);
        }
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.route.queryParams.subscribe(queryParams => {
            if (queryParams['itemSelecionado']) {
                this.form.patchValue(JSON.parse(queryParams['itemSelecionado']));
            }
        });
    }

    initializeForm(): void {
        console.log('Campos:', this.campos);
        this.campos.forEach(campo => {
            this.form.addControl(campo.campo, new FormControl('', campo.tipo === 'select' ? Validators.required : null));
            if (campo.tipo === 'select' && campo.optionsEndpoint) {
                this.nestedService.getAll(campo.optionsEndpoint).subscribe(data => {
                    console.log('Dados retornados:', data);
                    if (campo.labelField && campo.valueField) {
                        this.filteredOptions = data.map(item => {
                            let label = item[campo.labelField as keyof typeof item];
                            const value = item[campo.valueField as keyof typeof item];

                            if (campo.concatFields) {
                                campo.concatFields.forEach(field => {
                                    if (item[field as keyof typeof item]) {
                                        label += ` (${item[field as keyof typeof item]})`;
                                    }
                                });
                            }
                            if (label && value) {
                                return { label: `${label}`, value };
                            } else {
                                console.error(`Dados inválidos: item =`, item);
                                return null;
                            }
                        }).filter(option => option !== null);
                    } else {
                        console.error(`Campos labelField ou valueField não definidos para ${campo.campo}`);
                    }
                    console.log('Dados filtrados corretamente:', this.filteredOptions);
                });
            }
        });
    }

    salvar(): void {
        if (this.form.valid) {
            const formData = { ...this.form.value };
            this.campos.forEach(campo => {
                if (campo.tipo === 'select' && formData[campo.campo] && formData[campo.campo].value) {
                    formData[`Id${campo.label}`] = formData[campo.campo].value;
                    delete formData[campo.campo];
                }
            });


            console.log('Dados do formulário antes do envio:', formData);

            this.nestedService.create(this.endpoint, formData).subscribe(
                response => {
                    console.log('Resposta do servidor:', response);
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Dados salvos com sucesso!' });
                    this.visible = false;
                    this.visibleChange.emit(this.visible);
                    this.router.navigate([`/${this.endpoint}`]);
                },
                error => {
                    console.error('Erro ao salvar dados:', error);
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar os dados, verifique e tente novamente' });
                }
            );
        } else {
            console.error('Formulário inválido');
            this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Preencha todos os campos corretamente' });
        }
    }

    cancelar(): void {
        if (this.visible) {
            this.visible = false;
            this.visibleChange.emit(this.visible);
            this.router.navigate([`/${this.endpoint}`]);
        }
    }

    filterOptions(event: any): void {
        const query = event.query.toLowerCase();
        this.filteredOptions = this.filteredOptions.filter(option =>
            option.label && option.label.toLowerCase().includes(query)
        );
        console.log('Opções filtradas corretamente:', this.filteredOptions);
    }
}