import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Nacionalidade } from '../components/interface/nacionalidade';

@Injectable({
    providedIn: 'root'
})
export class NacionalidadeService {

    private endpoint = 'Nacionalidade';

    constructor(private apiService: ApiService) { }

    getNacionalidades(): Observable<Nacionalidade[]> {
        return this.apiService.getAll<Nacionalidade>(this.endpoint);
    }

    getNacionalidadeById(id: number): Observable<Nacionalidade> {
        return this.apiService.getById<Nacionalidade>(this.endpoint, id);
    }

    addNacionalidade(nacionalidade: Nacionalidade): Observable<Nacionalidade> {
        return this.apiService.create<Nacionalidade, Nacionalidade>(this.endpoint, nacionalidade);
    }

    updateNacionalidade(id: number, nacionalidade: Nacionalidade): Observable<Nacionalidade> {
        return this.apiService.update<Nacionalidade, Nacionalidade>(this.endpoint, id, nacionalidade);
    }

    deleteNacionalidade(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}