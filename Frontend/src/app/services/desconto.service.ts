import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Desconto } from '../components/interface/desconto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DescontoService {

  private endpoint = 'Desconto';

  constructor(private apiService: ApiService) { }

  getDescontos(): Observable<Desconto[]> {
    return this.apiService.getAll<Desconto>(this.endpoint);
  }

  getDesconto(id: number): Observable<Desconto> {
    return this.apiService.getById<Desconto>(this.endpoint, id);
  }

  addDesconto(desconto: Desconto): Observable<Desconto> {
    return this.apiService.create<Desconto>(this.endpoint, desconto);
  }

  updateDesconto(id: number, desconto: Desconto): Observable<Desconto> {
    return this.apiService.update<Desconto>(this.endpoint, id, desconto);
  }

  deleteDesconto(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
