import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

export interface Municipio {
  id: number;
  nomeMunicipio: string;
  estadoSigla: string;
  [key: string]: any;
}

export interface Estado {
  id: number;
  sigla: string;
}

@Component({
  selector: 'app-municipio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss'],
})
export class MunicipioComponent implements OnInit {
  titulo: string = 'Municipio';
  colunas = [
    { label: 'Municipio', campo: 'nomeMunicipio' },
    { label: 'Estado', campo: 'estadoSigla' },
  ];
  itens: Municipio[] = [];
  estados: Estado[] = [];
  endpoint: string = 'municipio';

  form: FormGroup;
  isFormVisible: boolean = false;
  isEditMode: boolean = false;
  currentItemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService<Municipio>,
    private estadoService: ApiService<Estado>,
    private router: Router
  ) {
    this.form = this.fb.group({
      nomeMunicipio: new FormControl('', Validators.required),
      idEstado: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.carregarDados();
    this.carregarEstados();
  }

  carregarDados(): void {
    this.apiService.getAll(this.endpoint).subscribe({
      next: (data) => (this.itens = data),
      error: (err) => console.error('Erro ao carregar municipios:', err),
    });
  }

  carregarEstados(): void {
    this.estadoService.getAll('estado').subscribe({
      next: (data) => (this.estados = data),
      error: (err) => console.error('Erro ao carregar estados:', err),
    });
  }

  onIncluirItem(): void {
    console.log('Método onIncluirItem chamado');
    this.isFormVisible = true;
    this.isEditMode = false;
    this.form.reset();
  }

  onEditarItem(item: Municipio): void {
    this.isFormVisible = true;
    this.isEditMode = true;
    this.currentItemId = item.id;
    this.form.patchValue({
      nomeMunicipio: item.nomeMunicipio,
      idEstado: this.estados.find(estado => estado.sigla === item.estadoSigla)?.id || ''
    });
  }  

  onExcluirItem(item: Municipio): void {
    if (confirm(`Deseja realmente excluir o municipio "${item.nomeMunicipio}"?`)) {
      this.apiService.delete(this.endpoint, item.id).subscribe({
        next: () => {
          this.itens = this.itens.filter((i) => i.id !== item.id);
        },
        error: (err) => console.error('Erro ao excluir municipio:', err),
      });
    }
  }

  salvar(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      formData.nomeMunicipio = formData.nomeMunicipio.toUpperCase();

      if (this.isEditMode && this.currentItemId !== null) {
        formData.id = this.currentItemId;
        this.apiService.update(this.endpoint, this.currentItemId, formData).subscribe({
          next: () => {
            alert('Municipio atualizado com sucesso!');
            this.carregarDados();
            this.isFormVisible = false;
          },
          error: (err) => console.error('Erro ao atualizar municipio:', err)
        });
      } else {
        this.apiService.create(this.endpoint, formData).subscribe({
          next: () => {
            alert('Municipio criado com sucesso!');
            this.carregarDados();
            this.isFormVisible = false;
          },
          error: (err) => console.error('Erro ao criar municipio:', err)
        });
      }
    } else {
      console.error('Formulário inválido');
    }
  }

  cancelar(): void {
    this.isFormVisible = false;
    this.form.reset();
  }
}
