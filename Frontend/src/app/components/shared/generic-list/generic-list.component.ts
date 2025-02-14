import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GenericActionsComponent } from '../generic-actions/generic-actions.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [CommonModule, RouterModule, GenericActionsComponent, TableModule, ButtonModule],
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent {
  @Input() titulo!: string;
  @Input() colunas!: any[];
  @Input() itens!: any[];
  @Input() endpoint!: string;
  @Input() confirmMessageField!: string;
  @Input() showAddButton: boolean = true;

  @Output() incluir = new EventEmitter<void>();
  @Output() editar = new EventEmitter<any>();
  @Output() excluir = new EventEmitter<any>();

  onIncluirItem(): void {
    this.incluir.emit();
  }

  onEditarItem(item: any): void {
    this.editar.emit(item);
  }
  
  onExcluirItem(item: any): void {
    this.excluir.emit(item);
  }
}