import { Component, Input, OnInit, Output, EventEmitter, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigService, CampoConfig } from '../../../services/config.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../../services/api.service';

interface GenericFormComponentProps {
    [key: string]: any;
}

@Component({
    selector: 'app-generic-form',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, DialogModule, CalendarModule, ToastModule
    ],
    templateUrl: './generic-form.component.html',
    styleUrls: ['./generic-form.component.scss'],
    providers: [MessageService]
})
export class GenericFormComponent implements OnInit, OnChanges, GenericFormComponentProps {
    @Output() onFormHide = new EventEmitter<void>();
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
        private apiService: ApiService, 
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
            const control = new FormControl('', Validators.required);
            this.form.addControl(
                campo.campo,
                control
            );
        });
    }

    buscarDadosPorId(id: number): void {
        this.loading = true;
        this.apiService.getById<any>(this.endpoint, id).subscribe({ 
            next: data => this.form.patchValue(data),
            error: () => this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar dados.' }),
            complete: () => this.loading = false
        });
    }

    salvar(): void {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'warn', detail: 'Preencha todos os campos corretamente' });
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
            ? this.apiService.update(this.endpoint, this.id, formData)
            : this.apiService.create(this.endpoint, formData);

        request.subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', detail: 'Dados salvos com sucesso!' });
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