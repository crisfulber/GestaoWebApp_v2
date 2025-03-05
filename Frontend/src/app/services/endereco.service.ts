import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Endereco } from '../components/interface/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private endpoint = 'Endereco';

  constructor(private apiService: ApiService) { }

  getEnderecos(): Observable<Endereco[]> {
    return this.apiService.getAll<Endereco>(this.endpoint);
  }

  getEnderecoById(id: number): Observable<Endereco> {
    return this.apiService.getById<Endereco>(this.endpoint, id);
  }

  addEndereco(endereco: Endereco): Observable<Endereco> {
    return this.apiService.create<Endereco>(this.endpoint, endereco);
  }

  updateEndereco(id: number, endereco: Endereco): Observable<Endereco> {
    return this.apiService.update<Endereco>(this.endpoint, id, endereco);
  }

  deleteEndereco(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}