import { Component } from '@angular/core';
import { AdminProjectManagementComponent } from '../admin-project-management/admin-project-management.component';
import { AdminReportsComponent } from '../admin-reports/admin-reports.component';
import { AdminActivityManagementComponent } from '../admin-activity-management/admin-activity-management.component';
import { AdminUserManagementComponent } from '../admin-user-management/admin-user-management.component';
import { Router } from '@angular/router';  // Para redirigir al login después del logout
import { LoginService } from '../services/auth/login.service'; // Importa tu LoginService
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar directivas como *ngIf


@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [
    CommonModule,
    AdminProjectManagementComponent,
    AdminReportsComponent,
    AdminActivityManagementComponent,
    AdminUserManagementComponent,
  ],
})
export class AdminDashboardComponent {
  activeSection: string = '';

  constructor(private loginService: LoginService, private router: Router) {}  // Inyecta LoginService y Router

  showSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    this.loginService.logout(); // Llama al método logout del servicio
    this.router.navigateByUrl('/login'); // Redirige al login después del logout
  }
}
