import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Documento } from '../components/interface/documento';

@Injectable({
    providedIn: 'root'
})
export class DocumentoService {

    private endpoint = 'Documento';

    constructor(private apiService: ApiService) { }

    getDocumentos(): Observable<Documento[]> {
        return this.apiService.getAll<Documento>(this.endpoint);
    }

    getDocumento(id: number): Observable<Documento> {
        return this.apiService.getById<Documento>(this.endpoint, id);
    }

    addDocumento(documento: Documento): Observable<Documento> {
        return this.apiService.create<Documento, Documento>(this.endpoint, documento);
    }

    updateDocumento(id: number, documento: Documento): Observable<Documento> {
        return this.apiService.update<Documento, Documento>(this.endpoint, id, documento);
    }

    deleteDocumento(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}