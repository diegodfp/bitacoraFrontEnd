import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityTypeDTO } from '../models/activity-type.model';  // Importar modelo

@Injectable({
  providedIn: 'root'
})
export class ActivityTypeService {
  constructor(private http: HttpClient) {}

  // Obtener todos los tipos de actividad
  getActivityTypes(): Observable<ActivityTypeDTO[]> {
    return this.http.get<ActivityTypeDTO[]>('http://localhost:8080/activity-types');
  }
}