import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Periodo } from '../components/interface/periodo';

@Injectable({
    providedIn: 'root'
})
export class PeriodoService {

    private endpoint = 'Periodo';

    constructor(private apiService: ApiService) { }

    getPeriodos(): Observable<Periodo[]> {
        return this.apiService.getAll<Periodo>(this.endpoint);
    }

    getPeriodo(id: number): Observable<Periodo> {
        return this.apiService.getById<Periodo>(this.endpoint, id);
    }

    addPeriodo(periodo: Periodo): Observable<Periodo> {
        return this.apiService.create<Periodo>(this.endpoint, periodo);
    }

    updatePeriodo(id: number, periodo: Periodo): Observable<Periodo> {
        return this.apiService.update<Periodo>(this.endpoint, id, periodo);
    }

    deletePeriodo(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}