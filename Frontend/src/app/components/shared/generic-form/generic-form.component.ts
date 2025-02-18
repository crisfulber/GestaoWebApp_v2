// generic-form.component.ts
import { Component, Input, OnInit, Output, EventEmitter, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigService, CampoConfig } from '../../../services/config.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { INestedService } from '../../../services/inested.service';
import { NESTED_SERVICE_TOKEN } from '../../../services/nested.service.token';

@Component({
    selector: 'app-generic-form',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, AutoCompleteModule, DialogModule,
        InputTextModule, ButtonModule, CalendarModule, ToastModule
    ],
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss'],
    providers: [MessageService]
})
export class GenericFormComponent implements OnInit, OnChanges {
    @Output() onFormHide = new EventEmitter<void>();
    @Output() autoCompleteSelect = new EventEmitter<{ campo: string, valor: any }>();
    @Input() showHeader = true;
    @Input() visible = false;
    @Input() itemSelecionado: any;
    @Input() modelo = '';

    titulo = '';
    campos: CampoConfig[] = [];
    endpoint = '';
    form: FormGroup;
    id: number | null = null;
    loading = false;

    constructor(
        private fb: FormBuilder,
        @Inject(NESTED_SERVICE_TOKEN) private nestedService: INestedService,
        private configService: ConfigService,
        private messageService: MessageService
    ) {
        this.form = this.fb.group({});
    }

    ngOnInit(): void {
        if (this.modelo) {
            this.loadConfig();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['modelo']?.currentValue) {
            this.loadConfig();
        }
        if (changes['itemSelecionado']?.currentValue) {
            this.id = this.itemSelecionado?.Id || null;
            this.form.patchValue(this.itemSelecionado);
        }
    }

    private loadConfig() {
        const configuracao = this.configService.getConfiguracao(this.modelo);
        if (configuracao) {
            this.titulo = configuracao.titulo;
            this.endpoint = configuracao.endpoint;
            this.campos = configuracao.campos;
            this.initializeForm();
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Configuração para o modelo "${this.modelo}" não encontrada.` });
        }
    }

    private initializeForm(): void {
        this.form = this.fb.group({ Id: [null] });
        this.campos.forEach(campo => {
            const control = new FormControl('', Validators.required); // Cria o FormControl aqui
            this.form.addControl(
                campo.campo,
                control // Adiciona o controle ao formulário
            );
        });

        this.form.valueChanges.subscribe((change) => {
            this.campos.forEach(campo => {
                if (campo.tipo == 'dropdown') {
                }
            });
        });
    }

    buscarDadosPorId(id: number): void {
        this.loading = true;
        this.nestedService.getById(this.endpoint, id).subscribe({
            next: data => this.form.patchValue(data),
            error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados.' }),
            complete: () => this.loading = false
        });
    }

    salvar(): void {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Preencha todos os campos corretamente' });
            return;
        }

        Object.keys(this.form.controls).forEach(key => {
            const control = this.form.get(key);
            const campoConfig = this.campos.find(c => c.campo === key);

            if (control && campoConfig && campoConfig.tipo === 'text') {
                control.setValue(control.value?.toUpperCase());
            }
        });

        this.loading = true;
        const formData = { ...this.form.value };
        if (!this.id) delete formData.Id;

        const request = this.id
            ? this.nestedService.update(this.endpoint, this.id, formData)
            : this.nestedService.create(this.endpoint, formData);

        request.subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Dados salvos com sucesso!' });
                this.onHide();
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao salvar os dados.' }),
            complete: () => this.loading = false
        });
    }

    onHide(): void {
        this.onFormHide.emit();
        this.form.reset();
    }

    cancelar(): void {
        this.onHide();
    }
}