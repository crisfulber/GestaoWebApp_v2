import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Setor } from '../components/interface/setor';

@Injectable({
    providedIn: 'root'
})
export class SetorService {

    private endpoint = 'Setor';

    constructor(private apiService: ApiService) { }

    getSetores(): Observable<Setor[]> {
        return this.apiService.getAll<Setor>(this.endpoint);
    }

    getSetor(id: number): Observable<Setor> {
        return this.apiService.getById<Setor>(this.endpoint, id);
    }

    addSetor(setor: Setor): Observable<Setor> {
        return this.apiService.create<Setor, Setor>(this.endpoint, setor);
    }

    updateSetor(id: number, setor: Setor): Observable<Setor> {
        return this.apiService.update<Setor, Setor>(this.endpoint, id, setor);
    }

    deleteSetor(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}