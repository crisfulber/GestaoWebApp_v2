import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericListComponent } from '../../shared/generic-list/generic-list.component';
import { GenericFormComponent } from '../../shared/generic-form/generic-form.component';
import { ConfigService } from '../../../services/config.service';
import { FormsModule } from '@angular/forms';
import { NESTED_SERVICE_TOKEN } from '../../../services/nested.service.token';
import { INestedService } from '../../../services/inested.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'; // Import ActivatedRoute and NavigationEnd
import { filter } from 'rxjs/operators'; // Import filter operator

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [CommonModule, GenericListComponent, GenericFormComponent, FormsModule],
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss'],
})
export class EstadoComponent {
  titulo: string = 'Estado';
  endpoint: string = 'estado';
  config: any;
  isFormVisible: boolean = false;
  itens: any[] = [];
  itemId: number | null = null; // Store the ID for editing
  itemSelecionado: any = null;

  constructor(
    private configService: ConfigService,
    @Inject(NESTED_SERVICE_TOKEN) private nestedService: INestedService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {
    this.config = this.configService.getConfiguracao(this.endpoint);
    this.carregarItens();

    // Subscribe to route changes to get the ID
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getItemIDFromRoute(); // Call function to set the ID
    });
  }

  ngOnInit() {
    this.getItemIDFromRoute();
  }

  getItemIDFromRoute() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.itemId = idParam ? +idParam : null;
  }

  carregarItens() {
    this.nestedService.getAll(this.endpoint).subscribe(itens => {
      this.itens = itens;
    });
  }

  onIncluirItem() {
    this.isFormVisible = true;
    this.itemId = null; // Reset the ID for new items
    this.itemSelecionado = null; // Clear selected item
  }

  onEditarItem(item: any) {
    this.itemSelecionado = item;
    this.isFormVisible = true;
    this.itemId = item.id; // Set the ID for editing
  }

  onExcluirItem(item: any) {
    // Implement delete logic here
  }

  onFormHide(event: any) {
    this.isFormVisible = false;
    this.itemId = null; // Reset ID after form is closed
    this.itemSelecionado = null; // Clear selected item
    this.carregarItens(); // Refresh the list
  }
}