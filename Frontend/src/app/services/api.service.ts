import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return headers;
  }

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }

  create<T>(endpoint: string, item: any): Observable<T>;
  create<T, U>(endpoint: string, item: U): Observable<T>;
  create<T, U>(endpoint: string, item: U): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, item, { headers: this.getHeaders() });
  }

  update<T>(endpoint: string, id: number, item: any): Observable<T>;
  update<T, U>(endpoint: string, id: number, item: U): Observable<T>;
  update<T, U>(endpoint: string, id: number, item: U): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, item, { headers: this.getHeaders() });
  }

  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}/${id}`, { headers: this.getHeaders() });
  }
}