import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Dependente } from '../components/interface/dependente';

@Injectable({
    providedIn: 'root'
})
export class DependenteService {

    private endpoint = 'Dependente';

    constructor(private apiService: ApiService) { }

    getDependentes(): Observable<Dependente[]> {
        return this.apiService.getAll<Dependente>(this.endpoint);
    }

    getDependenteById(id: number): Observable<Dependente> {
        return this.apiService.getById<Dependente>(this.endpoint, id);
    }

    addDependente(dependente: Dependente): Observable<Dependente> {
        return this.apiService.create<Dependente, Dependente>(this.endpoint, dependente);
    }

    updateDependente(id: number, dependente: Dependente): Observable<Dependente> {
        return this.apiService.update<Dependente, Dependente>(this.endpoint, id, dependente);
    }

    deleteDependente(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}