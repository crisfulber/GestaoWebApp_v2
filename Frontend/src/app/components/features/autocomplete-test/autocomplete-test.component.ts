// autocomplete-test.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { INestedService } from '../../../services/inested.service';
import { NESTED_SERVICE_TOKEN } from '../../../services/nested.service.token';

@Component({
  selector: 'app-autocomplete-test',
  standalone: true,
  imports: [AutoCompleteModule, ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="form">
      <p-autoComplete 
        formControlName="municipio" 
        [suggestions]="filteredMunicipios" 
        (completeMethod)="filterMunicipios($event)"
        field="NomeMunicipio"
        (onSelect)="onSelect($event)"
        placeholder="Selecione">
      </p-autoComplete>
    </form>
  `,
})
export class AutocompleteTestComponent implements OnInit {
  form: FormGroup;
  municipios: any[] = []; // Array para armazenar todos os municípios
  filteredMunicipios: any[] = [];

  constructor(
      private fb: FormBuilder,
      @Inject(NESTED_SERVICE_TOKEN) private nestedService: INestedService
  ) {
    this.form = this.fb.group({
      municipio: new FormControl('')
    });
  }

  ngOnInit() {
    this.loadMunicipios(); // Carrega todos os municípios ao iniciar o componente
  }

  loadMunicipios() {
    this.nestedService.getAll('municipio').subscribe(municipios => {
      this.municipios = municipios;
    });
  }

  filterMunicipios(event: any) {
    let query = event.query;
    this.filteredMunicipios = this.municipios.filter(municipio => 
      municipio.NomeMunicipio.toLowerCase().includes(query.toLowerCase())
    );
  }

    onSelect(event:any){
        this.form.get('municipio')?.setValue(event.NomeMunicipio);
        console.log(this.form.value);
    }
}