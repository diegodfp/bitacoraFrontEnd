import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-daily-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-daily-report.component.html',
  styleUrls: ['./user-daily-report.component.css']
})
export class UserDailyReportComponent implements OnInit {

  userId: number = 0;  // Almacenar el ID del usuario desde la sesión
  dailyLogs: any[] = [];  // Lista para almacenar los registros de tiempo

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Obtener el userId almacenado en sessionStorage
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      this.userId = parseInt(storedUserId);  // Convertir a número
      this.getDailyReport();  // Obtener el reporte diario
    } else {
      this.snackBar.open('No se encontró el ID de usuario', 'Cerrar', { duration: 3000 });
    }
  }

  // Método para obtener el reporte diario
  getDailyReport(): void {
    const today = new Date().toISOString().split('T')[0];  // Formato YYYY-MM-DD
    this.http.get<any[]>(`http://localhost:8080/user/${this.userId}/timelogs?date=${today}`)
      .subscribe(response => {
        this.dailyLogs = response;  // Asignar los registros de tiempo a la variable
      }, error => {
        this.snackBar.open('Error al obtener el reporte diario', 'Cerrar', { duration: 3000 });
        console.error('Error al obtener el reporte diario', error);
      });
  }
}
