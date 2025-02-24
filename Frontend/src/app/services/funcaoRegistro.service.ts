import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FuncaoRegistro } from '../components/interface/funcaoRegistro';

@Injectable({
    providedIn: 'root'
})
export class FuncaoRegistroService {

    private endpoint = 'FuncaoRegistro';

    constructor(private apiService: ApiService) { }

    getFuncaoRegistros(): Observable<FuncaoRegistro[]> {
        return this.apiService.getAll<FuncaoRegistro>(this.endpoint);
    }

    getFuncaoRegistro(id: number): Observable<FuncaoRegistro> {
        return this.apiService.getById<FuncaoRegistro>(this.endpoint, id);
    }

    addFuncaoRegistro(funcaoRegistro: FuncaoRegistro): Observable<FuncaoRegistro> {
        return this.apiService.create<FuncaoRegistro, FuncaoRegistro>(this.endpoint, funcaoRegistro);
    }

    updateFuncaoRegistro(id: number, funcaoRegistro: FuncaoRegistro): Observable<FuncaoRegistro> {
        return this.apiService.update<FuncaoRegistro, FuncaoRegistro>(this.endpoint, id, funcaoRegistro);
    }

    deleteFuncaoRegistro(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}