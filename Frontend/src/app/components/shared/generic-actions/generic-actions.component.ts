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
    const id = this.itemSelecionado?.Id;
    if (id) {
      this.editar.emit(this.itemSelecionado);
    } else {
      console.error('ID do item não encontrado para edição.');
    }
  }

  onConfirmDelete(): void {
    if (this.itemSelecionado) {
      this.excluir.emit(this.itemSelecionado);
    }
  }
}