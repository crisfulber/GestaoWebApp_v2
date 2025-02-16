import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }

  getById(endpoint: string, id: number): Observable<T> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  create(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  update(endpoint: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`);
  }
}  