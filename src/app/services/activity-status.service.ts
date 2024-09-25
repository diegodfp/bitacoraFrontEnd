import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityStatusService {

  private apiUrl = 'http://localhost:8080/activity-statuses';

  constructor(private http: HttpClient) { }

  // Obtener lista de estados de actividad
  getActivityStatuses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
