import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { User } from './user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userToken: string = '';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<User>(`${environment.urlHost}auth/login`, loginRequest);
  }

  logout(): void {
    this.userToken = '';
  }
}
