import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pessoa } from '../components/interface/pessoa';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    private endpoint = 'Pessoa';

    constructor(private apiService: ApiService) { }

    getPessoas(): Observable<Pessoa[]> {
        return this.apiService.getAll<Pessoa>(this.endpoint);
    }

    getPessoa(id: number): Observable<Pessoa> {
        return this.apiService.getById<Pessoa>(this.endpoint, id);
    }

    addPessoa(pessoa: Pessoa): Observable<Pessoa> {
        return this.apiService.create<Pessoa>(this.endpoint, pessoa);
    }

    updatePessoa(id: number, pessoa: Pessoa): Observable<Pessoa> {
        return this.apiService.update<Pessoa>(this.endpoint, id, pessoa);
    }

    deletePessoa(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}