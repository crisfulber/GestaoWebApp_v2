import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Banco } from '../components/interface/banco';

@Injectable({
    providedIn: 'root'
})
export class BancoService {

    private endpoint = 'Banco';

    constructor(private apiService: ApiService) { }

    getBancos(): Observable<Banco[]> {
        return this.apiService.getAll<Banco>(this.endpoint);
    }

    getBanco(id: number): Observable<Banco> {
        return this.apiService.getById<Banco>(this.endpoint, id);
    }

    addBanco(banco: Banco): Observable<Banco> {
        return this.apiService.create<Banco>(this.endpoint, banco);
    }

    updateBanco(id: number, banco: Banco): Observable<Banco> {
        return this.apiService.update<Banco>(this.endpoint, id, banco);
    }

    deleteBanco(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}