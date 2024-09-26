import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityDTO } from '../../models/activity.model';

@Component({
  selector: 'app-user-available-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-available-activities.component.html',
  styleUrl: './user-available-activities.component.css'
})
export class UserAvailableActivitiesComponent {
  activities: ActivityDTO[] = [];  // Lista de actividades asignadas al usuario
  userId: number = 0;  // Almacenar el ID del usuario desde la sesión

  constructor(private http: HttpClient) {}

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
    this.http.get<ActivityDTO[]>(`http://localhost:8080/activities/available/${this.userId}`)
      .subscribe(response => {
        this.activities = response;  // Asignar la respuesta a la lista de actividades
      }, error => {
        console.error('Error al obtener las actividades asignadas', error);
      });
  }

  // Confirmar si el usuario quiere asignarse la actividad
  confirmAssignActivity(activityId: number): void {
    const confirmation = confirm("¿Estás seguro de que deseas asignarte esta actividad?");
    if (confirmation) {
      this.assignActivity(activityId);
    }
  }

  // Lógica para asignar una actividad al usuario
  assignActivity(activityId: number): void {
    const assignmentData = {
      userId: this.userId,
      activityId: activityId,
      role: "developer"  // Puedes ajustar el rol según sea necesario
    };

    this.http.post('http://localhost:8080/api/assignments/activity', assignmentData)
      .subscribe(response => {
        alert('Actividad asignada con éxito');
        this.getAssignedActivities();  // Refrescar la lista de actividades disponibles
      }, error => {
        console.error('Error al asignar la actividad', error);
        alert('Hubo un problema al asignar la actividad');
      });
  }
}
