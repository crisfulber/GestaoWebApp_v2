import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { ConfigService } from '../../../services/config.service';
import { FormsModule } from '@angular/forms';
import { NESTED_SERVICE_TOKEN } from '../../../services/nested.service.token';
import { INestedService } from '../../../services/inested.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [CommonModule, GenericListComponent, GenericFormComponent, FormsModule],
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss'],
})
export class EstadoComponent {
  titulo: string = 'Estado';
  endpoint: string = 'Estado';
  config: any;
  isFormVisible: boolean = false;
  itens: any[] = [];

  constructor(
    private configService: ConfigService,
    @Inject(NESTED_SERVICE_TOKEN) private nestedService: INestedService,
    private router: Router
  ) {
    this.config = this.configService.getConfiguracao(this.endpoint);
    this.carregarItens();
  }

  carregarItens() {
    this.nestedService.getAll(this.endpoint).subscribe(itens => {
      this.itens = itens;
    })
  }
  onIncluirItem() {
    this.isFormVisible = !this.isFormVisible;
  }

  onEditarItem(item: any) {
    this.isFormVisible = true;
    this.router.navigate([`/${this.endpoint}/editar`, item.id], { queryParams: { modelo: this.endpoint, itemSelecionado: JSON.stringify(item) } });
  }

  onExcluirItem(item: any) {
  }

  onVisibleChange(visible: boolean) {
    console.log('VisibleChange:', visible);
    this.isFormVisible = visible;
    if (!visible) {
      this.carregarItens();
    }
  }
}