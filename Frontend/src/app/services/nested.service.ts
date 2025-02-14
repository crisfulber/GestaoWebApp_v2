import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { INestedService } from './inested.service';

@Injectable({
providedIn: 'root'
})
export class NestedService implements INestedService {
    constructor(private apiService: ApiService<any>) {}

    getAll(endpoint: string): Observable<any[]> {
        return this.apiService.getAll(endpoint);
    }

    getById(endpoint: string, id: number): Observable<any> {
        return this.apiService.getById(endpoint, id);
    }

    create(endpoint: string, data: any): Observable<any> {
        return this.apiService.create(endpoint, data);
    }

    update(endpoint: string, id: number, data: any): Observable<any> {
        return this.apiService.update(endpoint, id, data);
    }

    delete(endpoint: string, id: number): Observable<void> {
        return this.apiService.delete(endpoint, id);
    }
 }