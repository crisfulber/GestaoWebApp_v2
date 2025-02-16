import { Component, Inject, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { ConfigService } from '../../../services/config.service';
import { FormsModule } from '@angular/forms';
import { NESTED_SERVICE_TOKEN } from '../../../services/nested.service.token';
import { INestedService } from '../../../services/inested.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-municipio',
  standalone: true,
  imports: [CommonModule, GenericListComponent, GenericFormComponent, FormsModule, ConfirmDialogModule],
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService, ConfirmationService]
})
export class MunicipioComponent implements OnInit {
  titulo: string = 'Município';
  endpoint: string = 'municipio';
  config: any;
  isFormVisible: boolean = false;
  itens: any[] = [];
  itemId: number | null = null;
  itemSelecionado: any = null;
  estados: any[] = [];
  selectOptions: { [key: string]: any[] } = {}; 

  constructor(
    private configService: ConfigService,
    @Inject(NESTED_SERVICE_TOKEN) private nestedService: INestedService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.getItemIDFromRoute();
    });
  }

  ngOnInit() {
    this.config = this.configService.getConfiguracao(this.endpoint);
    this.carregarEstados(); 
    this.getItemIDFromRoute();
  }

  getItemIDFromRoute() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.itemId = idParam ? +idParam : null;
  }

  carregarEstados() {
    this.nestedService.getAll('estado').subscribe(estados => {
      this.estados = estados;
      this.selectOptions = { 
        IdEstado: estados 
      };
      this.carregarItens(); 
    });
  }

  carregarItens() {
    this.nestedService.getAll(this.endpoint).subscribe(municipios => {
      this.itens = municipios.map(municipio => {
        const estadoCorrespondente = this.estados.find(estado => estado.Id === municipio.IdEstado);
        return {
          ...municipio,
          SiglaEstado: estadoCorrespondente ? estadoCorrespondente.Sigla : 'N/A'
        };
      });
    });
  }

  onIncluirItem() {
    this.isFormVisible = true;
    this.itemId = null;
    this.itemSelecionado = null;
  }

  onEditarItem(item: any) {
    this.itemSelecionado = item;
    this.isFormVisible = true;
    this.itemId = item.Id;
  }

  confirmDelete(item: any) {
    this.confirmationService.confirm({
      message: `Deseja realmente excluir o item "${item.NomeMunicipio || item.Id}"?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.onExcluirItem(item)
    });
  }

  onExcluirItem(item: any) {
    this.nestedService.delete(this.endpoint, item.Id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Item excluído com sucesso!' });
        this.carregarItens();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir o item. Tente novamente.' });
      }
    });
  }

  onFormHide(event: any) {
    this.isFormVisible = false;
    this.itemId = null;
    this.itemSelecionado = null;
    this.carregarItens();
  }
}