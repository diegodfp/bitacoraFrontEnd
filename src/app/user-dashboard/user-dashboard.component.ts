import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { UserAssignedActivitiesComponent } from './user-assigned-activities/user-assigned-activities.component';
import { UserDailyReportComponent } from './user-daily-report/user-daily-report.component';
import { UserJourneyComponent } from './user-journey/user-journey.component';
import { UserAvailableActivitiesComponent } from './user-available-activities/user-available-activities.component';
@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [
    CommonModule,
    UserAssignedActivitiesComponent,
    UserDailyReportComponent,
    UserJourneyComponent,
    UserAvailableActivitiesComponent
  ],
})
export class UserDashboardComponent {
  activeSection: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  showSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
