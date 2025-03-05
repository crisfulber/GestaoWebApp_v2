import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Estado } from '../components/interface/estado';

@Injectable({
    providedIn: 'root'
})
export class EstadoService {

    private endpoint = 'Estado';

    constructor(private apiService: ApiService) { }

    getEstados(): Observable<Estado[]> {
        return this.apiService.getAll<Estado>(this.endpoint);
    }

    getEstadoById(id: number): Observable<Estado> {
        return this.apiService.getById<Estado>(this.endpoint, id);
    }

    addEstado(estado: Estado): Observable<Estado> {
        return this.apiService.create<Estado>(this.endpoint, estado);
    }

    updateEstado(id: number, estado: Estado): Observable<Estado> {
        return this.apiService.update<Estado>(this.endpoint, id, estado);
    }

    deleteEstado(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}