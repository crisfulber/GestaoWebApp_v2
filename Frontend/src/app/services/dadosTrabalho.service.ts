import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { DadosTrabalho } from '../components/interface/dadosTrabalho';

@Injectable({
  providedIn: 'root'
})
export class DadosTrabalhoService {

  private endpoint = 'DadosTrabalho';

  constructor(private apiService: ApiService) { }

  getDadosTrabalhos(): Observable<DadosTrabalho[]> {
    return this.apiService.getAll(this.endpoint);
  }

  getDadosTrabalho(id: number): Observable<DadosTrabalho> {
    return this.apiService.getById(this.endpoint, id);
  }

  addDadosTrabalho(dadosTrabalho: DadosTrabalho): Observable<DadosTrabalho> {
    return this.apiService.create(this.endpoint, dadosTrabalho);
  }

  updateDadosTrabalho(id: number, dadosTrabalho: DadosTrabalho): Observable<DadosTrabalho> {
    return this.apiService.update(this.endpoint, id, dadosTrabalho);
  }

  deleteDadosTrabalho(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}