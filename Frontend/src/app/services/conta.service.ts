import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Conta } from '../components/interface/conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private endpoint = 'Contas';

  constructor(private apiService: ApiService) { }

  getContas(): Observable<Conta[]> {
    return this.apiService.getAll<Conta>(this.endpoint);
  }

  getContaById(id: number): Observable<Conta> {
    return this.apiService.getById<Conta>(this.endpoint, id);
  }

  addConta(conta: Conta): Observable<Conta> {
    return this.apiService.create<Conta>(this.endpoint, conta);
  }

  updateConta(id: number, conta: Conta): Observable<Conta> {
    return this.apiService.update<Conta>(this.endpoint, id, conta);
  }

  deleteConta(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}