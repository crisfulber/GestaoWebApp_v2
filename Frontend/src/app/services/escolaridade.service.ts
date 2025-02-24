import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Escolaridade } from '../components/interface/escolaridade';

@Injectable({
    providedIn: 'root'
})
export class EscolaridadeService {

    private endpoint = 'Escolaridade';

    constructor(private apiService: ApiService) { }

    getEscolaridades(): Observable<Escolaridade[]> {
        return this.apiService.getAll<Escolaridade>(this.endpoint);
    }

    getEscolaridade(id: number): Observable<Escolaridade> {
        return this.apiService.getById<Escolaridade>(this.endpoint, id);
    }

    addEscolaridade(escolaridade: Escolaridade): Observable<Escolaridade> {
        return this.apiService.create<Escolaridade, Escolaridade>(this.endpoint, escolaridade);
    }

    updateEscolaridade(id: number, escolaridade: Escolaridade): Observable<Escolaridade> {
        return this.apiService.update<Escolaridade, Escolaridade>(this.endpoint, id, escolaridade);
    }

    deleteEscolaridade(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}