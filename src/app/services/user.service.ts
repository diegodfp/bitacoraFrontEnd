import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // Obtener lista de usuarios por departamento
  getUsersByDepartment(departmentId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/user/department/${departmentId}`);  // Ajusta la URL según tu backend
  }
}
