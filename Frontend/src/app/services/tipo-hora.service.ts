import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TipoHora } from '../components/interface/tipoHora';

@Injectable({
  providedIn: 'root'
})
export class TipoHoraService {

  private endpoint = 'TipoHora';

  constructor(private apiService: ApiService) { }

  getTiposHora(): Observable<TipoHora[]> {
    return this.apiService.getAll<TipoHora>(this.endpoint);
  }

  getTipoHora(id: number): Observable<TipoHora> {
    return this.apiService.getById<TipoHora>(this.endpoint, id);
  }

  addTipoHora(tipoHora: TipoHora): Observable<TipoHora> {
    return this.apiService.create<TipoHora>(this.endpoint, tipoHora);
  }

  updateTipoHora(id: number, tipoHora: TipoHora): Observable<TipoHora> {
    return this.apiService.update<TipoHora>(this.endpoint, id, tipoHora);
  }

  deleteTipoHora(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
