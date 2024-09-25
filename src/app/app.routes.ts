import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Login será la página principal
  { path: '**', redirectTo: 'login' }  // Redirige cualquier otra ruta al login
];
