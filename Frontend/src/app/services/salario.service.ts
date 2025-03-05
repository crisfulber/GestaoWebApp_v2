import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Salario } from '../components/interface/salario';

@Injectable({
    providedIn: 'root'
})
export class SalarioService {

    private endpoint = 'Salarios';

    constructor(private apiService: ApiService) { }

    getSalarios(): Observable<Salario[]> {
        return this.apiService.getAll<Salario>(this.endpoint);
    }

    getSalarioById(id: number): Observable<Salario> {
        return this.apiService.getById<Salario>(this.endpoint, id);
    }

    addSalario(salario: Salario): Observable<Salario> {
        return this.apiService.create<Salario>(this.endpoint, salario);
    }

    updateSalario(id: number, salario: Salario): Observable<Salario> {
        return this.apiService.update<Salario>(this.endpoint, id, salario);
    }

    deleteSalario(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}