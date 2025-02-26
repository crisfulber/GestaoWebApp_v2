import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { EstadoCivil } from '../components/interface/estadoCivil';

@Injectable({
    providedIn: 'root'
})
export class EstadoCivilService {

    private endpoint = 'EstadoCivil';

    constructor(private apiService: ApiService) { }

    getEstadosCivis(): Observable<EstadoCivil[]> {
        return this.apiService.getAll<EstadoCivil>(this.endpoint);
    }

    getEstadoCivil(id: number): Observable<EstadoCivil> {
        return this.apiService.getById<EstadoCivil>(this.endpoint, id);
    }

    addEstadoCivil(estadocivil: EstadoCivil): Observable<EstadoCivil> {
        return this.apiService.create<EstadoCivil, EstadoCivil>(this.endpoint, estadocivil);
    }

    updateEstadoCivil(id: number, estadocivil: EstadoCivil): Observable<EstadoCivil> {
        return this.apiService.update<EstadoCivil, EstadoCivil>(this.endpoint, id, estadocivil);
    }

    deleteEstadoCivil(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}