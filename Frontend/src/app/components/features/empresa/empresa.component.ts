import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { ConfigService } from '../../../services/config.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [GenericListComponent, GenericFormComponent, FormsModule, CommonModule],
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent {
  titulo: string = 'Empresa';
  endpoint: string = 'Empresa';
  config: any;
  isFormVisible: boolean = false;

  constructor(
    private configService: ConfigService,
  ) {
    this.config = this.configService.getConfiguracao(this.endpoint);
  }

  onIncluirItem() {
    this.isFormVisible = true;
  }

  onEditarItem(item: any) {
    this.isFormVisible = true;
  }

  onExcluirItem(item: any) {
  }
}