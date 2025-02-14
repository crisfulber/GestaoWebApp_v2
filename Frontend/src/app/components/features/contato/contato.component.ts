import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

export interface Contato {
  id: number;
  telefone: string;
  email: string;
  [key: string]: any;
}

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent implements OnInit {
  titulo: string = 'Contato';
  colunas = [
    { label: 'Telefone', campo: 'telefone' },
    { label: 'Email', campo: 'email' },
  ];
  itens: Contato[] = [];
  endpoint: string = 'contato';

  form: FormGroup;
  isFormVisible: boolean = false;
  isEditMode: boolean = false;
  currentItemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService<Contato>,
    private router: Router
  ) {
    this.form = this.fb.group({
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.apiService.getAll(this.endpoint).subscribe({
      next: (data) => (this.itens = data),
      error: (err) => console.error('Erro ao carregar contatos:', err),
    });
  }

  onIncluirItem(): void {
    this.isFormVisible = true;
    this.isEditMode = false;
    this.form.reset();
  }

  onEditarItem(item: Contato): void {
    this.isFormVisible = true;
    this.isEditMode = true;
    this.currentItemId = item.id;
    this.form.patchValue(item);
  }

  onExcluirItem(item: Contato): void {
    if (confirm(`Deseja realmente excluir o contato "${item.id}"?`)) {
      this.apiService.delete(this.endpoint, item.id).subscribe({
        next: () => {
          this.itens = this.itens.filter((i) => i.id !== item.id);
        },
        error: (err) => console.error('Erro ao excluir contato:', err),
      });
    }
  }

  salvar(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };

      if (this.isEditMode && this.currentItemId !== null) {
        formData.id = this.currentItemId; // Adicione o ID ao formData
        this.apiService.update(this.endpoint, this.currentItemId, formData).subscribe({
          next: () => {
            alert('Contato atualizado com sucesso!');
            this.carregarDados();
            this.isFormVisible = false;
          },
          error: (err) => console.error('Erro ao atualizar contato:', err)
        });
      } else {
        this.apiService.create(this.endpoint, formData).subscribe({
          next: () => {
            alert('Contato criado com sucesso!');
            this.carregarDados();
            this.isFormVisible = false;
          },
          error: (err) => console.error('Erro ao criar contato:', err)
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
