import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  template: `
    <div class="p-8">
      <h1 class="text-3xl font-bold">Dashboard de Usuario</h1>
      <p>Bienvenido al panel de control de usuario.</p>
      <!-- Aquí puedes agregar las funcionalidades para el usuario común -->
    </div>
  `,
  styles: []
})
export class UserDashboardComponent { }
