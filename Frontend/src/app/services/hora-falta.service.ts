import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HoraFalta } from '../components/interface/horaFalta';

@Injectable({
  providedIn: 'root'
})
export class HoraFaltaService {

  private endpoint = 'HoraFalta';

  constructor(private apiService: ApiService) { }

  getHorasFaltas(): Observable<HoraFalta[]> {
    return this.apiService.getAll<HoraFalta>(this.endpoint);
  }

  getHoraFalta(id: number): Observable<HoraFalta> {
    return this.apiService.getById<HoraFalta>(this.endpoint, id);
  }

  addHoraFalta(hf: HoraFalta): Observable<HoraFalta> {
    return this.apiService.create<HoraFalta>(this.endpoint, hf);
  }

  updateHoraFalta(id: number, hf: HoraFalta): Observable<HoraFalta> {
    return this.apiService.update<HoraFalta>(this.endpoint, id, hf);
  }

  deleteHoraFalta(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
