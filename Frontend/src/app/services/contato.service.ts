import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Contato } from '../components/interface/contato';

@Injectable({
    providedIn: 'root'
})
export class ContatoService {

    private endpoint = 'Contato';

    constructor(private apiService: ApiService) { }

    getContatos(): Observable<Contato[]> {
        return this.apiService.getAll<Contato>(this.endpoint);
    }

    getContatoById(id: number): Observable<Contato> {
        return this.apiService.getById<Contato>(this.endpoint, id);
    }

    addContato(contato: Contato): Observable<Contato> {
        return this.apiService.create<Contato>(this.endpoint, contato);
    }

    updateContato(id: number, contato: Contato): Observable<Contato> {
        return this.apiService.update<Contato>(this.endpoint, id, contato);
    }

    deleteContato(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}