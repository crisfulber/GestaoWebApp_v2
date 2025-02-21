import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Municipio } from '../components/interface/municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private endpoint = 'Municipio';

  constructor(private apiService: ApiService) { }

  getMunicipios(): Observable<Municipio[]> {
    return this.apiService.getAll<Municipio>(this.endpoint);
  }

  getMunicipio(id: number): Observable<Municipio> {
    return this.apiService.getById<Municipio>(this.endpoint, id);
  }

  addMunicipio(municipio: Municipio): Observable<Municipio> {
    return this.apiService.create<Municipio>(this.endpoint, municipio);
  }

  updateMunicipio(id: number, municipio: Municipio): Observable<Municipio> {
    return this.apiService.update<Municipio>(this.endpoint, id, municipio);
  }

  deleteMunicipio(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}