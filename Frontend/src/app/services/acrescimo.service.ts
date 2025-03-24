import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acrescimo } from '../components/interface/acrescimo';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AcrescimoService {

  private endpoint = 'Acrescimo';

  constructor(private apiService: ApiService) { }

  getAcrescimos(): Observable<Acrescimo[]> {
    return this.apiService.getAll<Acrescimo>(this.endpoint);
  }

  getAcrescimo(id: number): Observable<Acrescimo> {
    return this.apiService.getById<Acrescimo>(this.endpoint, id);
  }

  addAcrescimo(acrescimo: Acrescimo): Observable<Acrescimo> {
    return this.apiService.create<Acrescimo>(this.endpoint, acrescimo);
  }

  updateAcrescimo(id: number, acrescimo: Acrescimo): Observable<Acrescimo> {
    return this.apiService.update<Acrescimo>(this.endpoint, id, acrescimo);
  }

  deleteAcrescimo(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
