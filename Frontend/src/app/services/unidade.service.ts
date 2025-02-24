import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Unidade } from '../components/interface/unidade';

@Injectable({
    providedIn: 'root'
})
export class UnidadeService {

    private endpoint = 'Unidade';

    constructor(private apiService: ApiService) { }

    getUnidades(): Observable<Unidade[]> {
        return this.apiService.getAll<Unidade>(this.endpoint);
    }

    getUnidade(id: number): Observable<Unidade> {
        return this.apiService.getById<Unidade>(this.endpoint, id);
    }

    addUnidade(unidade: UnidadeDto): Observable<Unidade> {
        return this.apiService.create<Unidade, UnidadeDto>(this.endpoint, unidade);
    }

    updateUnidade(id: number, unidade: UnidadeDto): Observable<Unidade> {
        return this.apiService.update<Unidade, UnidadeDto>(this.endpoint, id, unidade);
    }

    deleteUnidade(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}

export interface UnidadeDto {
    NomeUnidade: string;
    IdEmpresa: number;
    Rua: string;
    Numero: number;
    Complemento?: string;
    Bairro: string;
    CEP: string;
    IdMunicipio: number | null;
    IdEstado: number | null;
}