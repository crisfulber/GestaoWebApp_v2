import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Empresa } from '../components/interface/empresa';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    private endpoint = 'Empresa';

    constructor(private apiService: ApiService) { }

    getEmpresas(): Observable<Empresa[]> {
        return this.apiService.getAll<Empresa>(this.endpoint);
    }

    getEmpresa(id: number): Observable<Empresa> {
        return this.apiService.getById<Empresa>(this.endpoint, id);
    }

    addEmpresa(empresa: EmpresaDto): Observable<Empresa> {
        return this.apiService.create<Empresa, EmpresaDto>(this.endpoint, empresa);
    }

    updateEmpresa(id: number, empresa: EmpresaDto): Observable<Empresa> {
        return this.apiService.update<Empresa, EmpresaDto>(this.endpoint, id, empresa);
    }

    deleteEmpresa(id: number): Observable<void> {
        return this.apiService.delete(this.endpoint, id);
    }
}

export interface EmpresaDto {
    NomeEmpresa: string;
    CNPJ_CEI: string;
    Rua: string;
    Numero: number;
    Complemento?: string;
    Bairro: string;
    CEP: string;
    IdMunicipio: number | null;
    IdEstado: number | null;
    Telefone?: string;
    Email?: string;
}