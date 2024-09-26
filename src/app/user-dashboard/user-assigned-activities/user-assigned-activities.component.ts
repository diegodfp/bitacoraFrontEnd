import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityDTO } from '../../models/activity.model';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importando MatSnackBar

@Component({
  selector: 'app-user-assigned-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-assigned-activities.component.html',
  styleUrls: ['./user-assigned-activities.component.css']
})
export class UserAssignedActivitiesComponent implements OnInit {

  activities: ActivityDTO[] = [];  // Lista de actividades asignadas al usuario
  userId: number = 0;  // Almacenar el ID del usuario desde la sesión
  isActivityInProgress: boolean = false;  // Indicar si hay una actividad en progreso
  currentActivityId: number | null = null;  // ID de la actividad actualmente en curso

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}  // Inyectando MatSnackBar

  ngOnInit(): void {
    // Obtener el userId almacenado en sessionStorage
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      this.userId = parseInt(storedUserId);  // Convertir a número
      this.getAssignedActivities();  // Cargar las actividades asignadas
    }
  }

  // Método para obtener las actividades asignadas al usuario
  getAssignedActivities(): void {
    this.http.get<ActivityDTO[]>(`http://localhost:8080/user/${this.userId}/activities`)
      .subscribe(response => {
        this.activities = response;  // Asignar la respuesta a la lista de actividades
      }, error => {
        console.error('Error al obtener las actividades asignadas', error);
        this.snackBar.open('Error al obtener las actividades asignadas', 'Cerrar', { duration: 3000 });  // Mensaje de error
      });
  }

  // Método para iniciar una actividad
  startActivity(activityId: number, projectId: number): void {
    const body = { userId: this.userId, projectId };
    this.http.post(`http://localhost:8080/activities/${activityId}/start`, body, { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
        this.isActivityInProgress = true;
        this.currentActivityId = activityId;

        // Mensaje de éxito al iniciar la actividad
        this.snackBar.open('Actividad iniciada correctamente', 'Cerrar', { duration: 3000 });
      }, error => {
        console.error('Error al iniciar la actividad', error);
        this.snackBar.open('Error al iniciar la actividad', 'Cerrar', { duration: 3000 });  // Mensaje de error
      });
  }

  // Método para pausar una actividad
  pauseActivity(activityId: number, projectId: number): void {
    const body = { userId: this.userId, projectId };
    this.http.post(`http://localhost:8080/activities/${activityId}/pause`, body, { responseType: 'text' })
      .subscribe((response) => {
        console.log(response);
        this.isActivityInProgress = false;  // Marcar que no hay actividad en progreso
        this.currentActivityId = null;  // Reiniciar el ID de la actividad en curso

        // Mensaje de éxito al pausar la actividad
        this.snackBar.open('Actividad pausada correctamente', 'Cerrar', { duration: 3000 });
      }, error => {
        console.error('Error al pausar la actividad', error);
        this.snackBar.open('Error al pausar la actividad', 'Cerrar', { duration: 3000 });  // Mensaje de error
      });
  }
}
