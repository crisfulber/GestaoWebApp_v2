import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Adiantamento } from '../components/interface/adiantamento';

@Injectable({
  providedIn: 'root'
})
export class AdiantamentoService {

  private endpoint = 'Adiantamento';

  constructor(private apiService: ApiService) { }

  getAdiantamentos(): Observable<Adiantamento[]> {
    return this.apiService.getAll<Adiantamento>(this.endpoint);
  }

  getAdiantamento(id: number): Observable<Adiantamento> {
    return this.apiService.getById<Adiantamento>(this.endpoint, id);
  }

  addAdiantamento(Adiantamento: Adiantamento): Observable<Adiantamento> {
    return this.apiService.create<Adiantamento>(this.endpoint, Adiantamento);
  }

  updateAdiantamento(id: number, Adiantamento: Adiantamento): Observable<Adiantamento> {
    return this.apiService.update<Adiantamento>(this.endpoint, id, Adiantamento);
  }

  deleteAdiantamento(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
