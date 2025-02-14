import { Observable } from 'rxjs';

export interface INestedService {
    getAll(endpoint: string): Observable<any[]>;
    getById(endpoint: string, id: number): Observable<any>;
    create(endpoint: string, data: any): Observable<any>;
    update(endpoint: string, id: number, data: any): Observable<any>;
    delete(endpoint: string, id: number): Observable<void>;
}