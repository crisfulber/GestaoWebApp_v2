import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { DadosPessoais } from '../components/interface/dadosPessoais';

@Injectable({
    providedIn: 'root'
})
export class DadosPessoaisService {

    private endpoint = 'DadosPessoais';

    constructor(private apiService: ApiService) { }

    getDadosPessoais(): Observable<DadosPessoais[]> {
        return this.apiService.getAll<DadosPessoais>(this.endpoint);
    }

    getDadosPessoaisAll(id: number): Observable<DadosPessoais> {
        return this.apiService.getById<DadosPessoais>(this.endpoint, id);
    }

    addDadosPessoais(dadosPessoais: DadosPessoais): Observable<DadosPessoais> {
        return this.apiService.create<DadosPessoais>(this.endpoint, dadosPessoais);
    }

    updateDadosPessoais(id: number, dadosPessoais: DadosPessoais): Observable<DadosPessoais> {
        return this.apiService.update<DadosPessoais>(this.endpoint, id, dadosPessoais);
    }

    deleteDadosPessoais(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}