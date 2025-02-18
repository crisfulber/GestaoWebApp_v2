import { Component, Inject, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { ConfigService } from '../../../services/config.service';
import { FormsModule } from '@angular/forms';
import { NESTED_SERVICE_TOKEN } from '../../../services/nested.service.token';
import { INestedService } from '../../../services/inested.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [CommonModule, GenericListComponent, GenericFormComponent, FormsModule, ConfirmDialogModule, DropdownModule, AutoCompleteModule],
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService, ConfirmationService]
})

export class EnderecoComponent implements OnInit {
  titulo: string = 'Endereço';
  endpoint: string = 'endereco';
  config: any;
  isFormVisible: boolean = false;
  itens: any[] = [];
  itemId: number | null = null;
  itemSelecionado: any = { IdEstado: null, NomeMunicipio: null, Estado: null };
  municipios: any[] = [];
  estados: any[] = [];
  filteredMunicipios: any[] = [];
  filteredEstados: any[] = [];

  constructor(
    private configService: ConfigService,
    @Inject(NESTED_SERVICE_TOKEN) private nestedService: INestedService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit() {
    this.config = this.configService.getConfiguracao(this.endpoint);
    this.loadMunicipios();
    this.loadEstados();
  
    const municipioCampo = this.config.campos.find((campo: any) => campo.campo == "NomeMunicipio");
    const estadoCampo = this.config.campos.find((campo: any) => campo.campo == "Estado");
  
    municipioCampo.suggestions = (event: any) => this.filterMunicipio(event);
    municipioCampo.field = 'NomeMunicipio';
  
    estadoCampo.suggestions = (event: any) => this.filterEstado(event);
    estadoCampo.field = 'Sigla';
  }
  


  carregarItens() {
    this.nestedService.getAll(this.endpoint).subscribe(itens => {
      this.itens = itens;
    });
  }

  onIncluirItem() {
    this.isFormVisible = true;
    this.itemId = null;
    this.itemSelecionado = { IdEstado: "", NomeMunicipio: "" };
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

  loadMunicipios() {
    this.nestedService.getAll('municipio').subscribe({
      next: (municipios) => {
        this.municipios = municipios;
        console.log("Municípios carregados:", this.municipios);
      },
      error: (err) => console.error("Erro ao carregar municípios:", err)
    });
  }

  loadEstados() {
    this.nestedService.getAll('estado').subscribe(estados => {
      this.estados = estados;
    });
  }

  filterMunicipio(event: any) {
    let query = event.query.toLowerCase();
  
    if (!this.municipios || this.municipios.length === 0) {
      console.warn("Lista de municípios está vazia.");
      return []; // Retornar array vazio se não houver municípios
    }
  
    const filteredMun = this.municipios.filter(municipio =>
      municipio.NomeMunicipio.toLowerCase().includes(query)
    );
  
    console.log("Lista filtrada: ", filteredMun);
  
    return filteredMun; // Retornar o array filtrado
  }    

  filterEstado(event: any) {
    let query = event.query;
    this.itemSelecionado.Estado = null; // Limpar seleção anterior
    const filteredStates = this.estados.filter(estado => estado.Sigla.toLowerCase().includes(query.toLowerCase()));
    return filteredStates; // Retornar o array filtrado
  }  

  onAutoCompleteSelect(event: { campo: string, valor: any }) {
    if (event.campo === 'NomeMunicipio') {
      this.itemSelecionado.NomeMunicipio = event.valor.NomeMunicipio;
      this.itemSelecionado.IdEstado = event.valor.IdEstado; // Store IdEstado
      const selectedState = this.estados.find(estado => estado.Id === event.valor.IdEstado);
      this.itemSelecionado.Estado = selectedState ? selectedState.Sigla : null; // Set Estado
    } else if (event.campo === 'Estado') {
      this.itemSelecionado.Estado = event.valor.Sigla;
    }
  }

}