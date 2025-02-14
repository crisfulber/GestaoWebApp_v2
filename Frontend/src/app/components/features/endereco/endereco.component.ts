import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

export interface Endereco {
  id: number;
  rua: string;
  numero: number;
  bairro: string;
  complemento: string;
  idMunicipio: number;
  cep: string;
  municipio: string;
  [key: string]: any;
}

export interface Municipio {
  id: number;
  nomeMunicipio: string;
  estadoSigla: string;
  [key: string]: any;
}

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
})
export class EnderecoComponent implements OnInit {
  titulo: string = 'Endereco';
  colunas = [
    { label: 'Rua', campo: 'rua' },
    { label: 'Numero', campo: 'numero' },
    { label: 'Bairro', campo: 'bairro' },
    { label: 'Complemento', campo: 'complemento' },
    { label: 'Município', campo: 'municipio' },
    { label: 'CEP', campo: 'cep' }
  ];
  itens: Endereco[] = [];
  municipios: Municipio[] = [];
  endpoint: string = 'endereco';

  form: FormGroup;
  isFormVisible: boolean = false;
  isEditMode: boolean = false;
  currentItemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService<Endereco>,
    private municipioService: ApiService<Municipio>,
    private router: Router
  ) {
    this.form = this.fb.group({
      rua: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      bairro: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      idMunicipio: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.carregarDados();
    this.carregarMunicipios();
  }

  carregarDados(): void {
    this.apiService.getAll(this.endpoint).subscribe({
      next: (data) => {
        this.itens = data;
      },
      error: (err) => console.error('Erro ao carregar enderecos:', err),
    });
  }

  carregarMunicipios(): void {
    this.municipioService.getAll('municipio').subscribe({
      next: (data) => {
        this.municipios = data;
      },
      error: (err) => console.error('Erro ao carregar municipios:', err),
    });
  }

  onIncluirItem(): void {
    this.isFormVisible = true;
    this.isEditMode = false;
    this.form.reset();
  }

  onEditarItem(item: Endereco): void {
    this.isFormVisible = true;
    this.isEditMode = true;
    this.currentItemId = item.id;

    const setFormValues = () => {
      this.form.patchValue({
        rua: item.rua,
        numero: item.numero,
        bairro: item.bairro,
        complemento: item.complemento,
        idMunicipio: item.idMunicipio,
        cep: item.cep
      });
    };

    if (this.municipios.length > 0) {
      setFormValues();
    } else {
      this.carregarMunicipios();
      const interval = setInterval(() => {
        if (this.municipios.length > 0) {
          setFormValues();
          clearInterval(interval);
        }
      }, 100);
    }
  }

  onExcluirItem(item: Endereco): void {
    if (confirm(`Deseja realmente excluir o endereco "${item.rua}"?`)) {
      this.apiService.delete(this.endpoint, item.id).subscribe({
        next: () => {
          this.itens = this.itens.filter((i) => i.id !== item.id);
        },
        error: (err) => console.error('Erro ao excluir endereco:', err),
      });
    }
  }

  salvar(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };
      if (this.isEditMode && this.currentItemId !== null) {
        formData.id = this.currentItemId;
        this.apiService.update(this.endpoint, this.currentItemId, formData).subscribe({
          next: () => {
            alert('Endereço atualizado com sucesso!');
            this.carregarDados();
            this.isFormVisible = false;
          },
          error: (err) => console.error('Erro ao atualizar endereço:', err)
        });
      } else {
        this.apiService.create(this.endpoint, formData).subscribe({
          next: () => {
            alert('Endereço criado com sucesso!');
            this.carregarDados();
            this.isFormVisible = false;
          },
          error: (err) => console.error('Erro ao criar endereço:', err)
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
