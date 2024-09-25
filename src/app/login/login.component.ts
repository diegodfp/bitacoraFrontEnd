import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/auth/login.service';
import { LoginRequest } from '../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  loginError: string = "";
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private loginService: LoginService
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          if (userData.role === 'ADMIN') {
            this.router.navigateByUrl('/inicio');
          } else {
            this.router.navigateByUrl('/inicio-user');
          }
          this.loginForm.reset();
        },
        error: () => {
          this.loginError = 'Error de autenticación. Verifica tus credenciales.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
