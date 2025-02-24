import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Funcao } from '../components/interface/funcao';

@Injectable({
    providedIn: 'root'
})
export class FuncaoService {

    private endpoint = 'Funcao';

    constructor(private apiService: ApiService) { }

    getFuncoes(): Observable<Funcao[]> {
        return this.apiService.getAll<Funcao>(this.endpoint);
    }

    getFuncao(id: number): Observable<Funcao> {
        return this.apiService.getById<Funcao>(this.endpoint, id);
    }

    addFuncao(funcao: Funcao): Observable<Funcao> {
        return this.apiService.create<Funcao, Funcao>(this.endpoint, funcao);
    }

    updateFuncao(id: number, funcao: Funcao): Observable<Funcao> {
        return this.apiService.update<Funcao, Funcao>(this.endpoint, id, funcao);
    }

    deleteFuncao(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}