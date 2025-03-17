import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HoraExtra } from '../components/interface/horaExtra';

@Injectable({
  providedIn: 'root'
})
export class HoraExtraService {

  private endpoint = 'HoraExtra';

  constructor(private apiService: ApiService) { }

  getHorasExtras(): Observable<HoraExtra[]> {
    return this.apiService.getAll<HoraExtra>(this.endpoint);
  }

  getHoraExtra(id: number): Observable<HoraExtra> {
    return this.apiService.getById<HoraExtra>(this.endpoint, id);
  }

  addHoraExtra(he: HoraExtra): Observable<HoraExtra> {
    return this.apiService.create<HoraExtra>(this.endpoint, he);
  }

  updateHoraExtra(id: number, he: HoraExtra): Observable<HoraExtra> {
    return this.apiService.update<HoraExtra>(this.endpoint, id, he);
  }

  deleteHoraExtra(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
