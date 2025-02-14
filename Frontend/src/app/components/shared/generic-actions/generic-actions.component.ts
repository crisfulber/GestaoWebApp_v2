import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic-actions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './generic-actions.component.html',
  styleUrls: ['./generic-actions.component.scss']
})
export class GenericActionsComponent {
  @Input() endpoint!: string;
  @Input() itemSelecionado: any;
  @Input() mostrarIncluir: boolean = true;
  @Input() mostrarEditar: boolean = true;
  @Input() mostrarExcluir: boolean = true;
  @Input() confirmMessageField!: string;

  @Output() incluir = new EventEmitter<void>();
  @Output() editar = new EventEmitter<any>();
  @Output() excluir = new EventEmitter<any>();

  constructor(private router: Router) { }

  onIncluir(): void {
    this.incluir.emit();
  }

  onEditar(): void {
    const id = this.itemSelecionado?.id;
    if (id) {
      this.router.navigate([`/${this.endpoint}/editar`, id], { queryParams: { modelo: this.endpoint } });
      this.editar.emit(this.itemSelecionado);
    } else {
      console.error('ID do item não encontrado para edição.');
    }
  }

  onExcluir(): void {
    const id = this.itemSelecionado?.id;
    if (id) {
      const confirmMessage = this.itemSelecionado[this.confirmMessageField] || 'Selecionado';
      if (confirm(`Deseja realmente excluir o item "${confirmMessage}"?`)) {
        this.excluir.emit(this.itemSelecionado);
      }
    } else {
      console.error('ID do item não encontrado para exclusão.');
    }
  }
}