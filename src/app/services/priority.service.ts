import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriorityDTO } from '../models/priority.model';  // Importar modelo

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  constructor(private http: HttpClient) {}

  // Obtener todas las prioridades
  getPriorities(): Observable<PriorityDTO[]> {
    return this.http.get<PriorityDTO[]>('http://localhost:8080/priorities');
  }
}