import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {}

  // Obtener lista de departamentos
  getDepartments(): Observable<any> {
    return this.http.get('http://localhost:8080/departments');  // Ajusta la URL según tu backend
  }
}
