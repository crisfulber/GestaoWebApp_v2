import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Escala } from '../components/interface/escala';

@Injectable({
    providedIn: 'root'
})
export class EscalaService {

    private endpoint = 'Escala';

    constructor(private apiService: ApiService) { }

    getEscalas(): Observable<Escala[]> {
        return this.apiService.getAll<Escala>(this.endpoint);
    }

    getEscala(id: number): Observable<Escala> {
        return this.apiService.getById<Escala>(this.endpoint, id);
    }

    addEscala(escala: Escala): Observable<Escala> {
        return this.apiService.create<Escala, Escala>(this.endpoint, escala);
    }

    updateEscala(id: number, escala: Escala): Observable<Escala> {
        return this.apiService.update<Escala, Escala>(this.endpoint, id, escala);
    }

    deleteEscala(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}