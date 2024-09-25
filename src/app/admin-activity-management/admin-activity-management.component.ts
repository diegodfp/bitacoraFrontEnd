import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDTO } from '../models/project.model'; // Define tu modelo para los proyectos
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar el pipe 'date'
import { FormsModule } from '@angular/forms'; 
import { DepartmentService } from '../services/department.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';  
import { ActivityDTO } from '../models/activity.model';
import { ActivityStatusService } from '../services/activity-status.service';

@Component({
  selector: 'app-admin-activity-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-activity-management.component.html',
  styleUrls: ['./admin-activity-management.component.css']
})
export class AdminActivityManagementComponent implements OnInit {

  activities: ActivityDTO[] = [];  // Lista de actividades
  selectedActivity: ActivityDTO = {} as ActivityDTO;  // Actividad seleccionada para edición/eliminación
  isEditPopupVisible = false;  // Control para mostrar el popup de edición
  isDeletePopupVisible = false;  // Control para mostrar el popup de eliminación
  isUpdateStatusPopupVisible = false;  // Control para mostrar el popup de actualización de estado
  statuses: any[] = [];

  constructor(
    private http: HttpClient,
    private activityStatusService: ActivityStatusService  // Inyecta el servicio de estados
  ){}

   // Datos para actualizar el estado de una actividad
   statusUpdate = {
    changed_by_user_id: 1,  // ID del usuario que está cambiando el estado (puedes modificarlo dinámicamente)
    status_id: 0,  // El nuevo estado
    change_comment: ''  // Comentario del cambio
  };

  ngOnInit(): void {
    this.getActivities();  // Cargar las actividades cuando se inicialice el componente
    this.getStatuses();  // Cargar posibles estados (si es necesario)
  }

   // Obtener todos los estados de actividad
   getActivityStatuses(): void {
    this.activityStatusService.getActivityStatuses().subscribe(statuses => {
      this.statuses = statuses;  // Almacenar los estados en la variable 'statuses'
    }, error => {
      console.error('Error al obtener los estados de actividad', error);
    });
  }

  // Método para obtener todas las actividades
  getActivities(): void {
    this.http.get<any>('http://localhost:8080/activities/list')
      .subscribe(response => {
        console.log('estoy aqui');
        this.activities = response;
      }, error => {
        console.error('Error al obtener las actividades', error);
      });
  }
  // Método para obtener los posibles estados de actividad (si se necesita)
  getStatuses(): void {
    this.http.get<any[]>('http://localhost:8080/activity-statuses')  // Ajustar URL según tu API
      .subscribe(response => {
        this.statuses = response;
      }, error => {
        console.error('Error al obtener los estados', error);
      });
  }

  // Método para actualizar los detalles de una actividad
  updateActivityDetails(): void {
    const updateUrl = `http://localhost:8080/activities/update-details/${this.selectedActivity.activityId}`;
    this.http.put(updateUrl, this.selectedActivity)
      .subscribe(() => {
        this.getActivities();  // Actualizar la lista de actividades
        this.closeEditPopup();  // Cerrar el popup
      }, error => {
        console.error('Error al actualizar la actividad', error);
      });
  }

  

  // Método para mostrar popup de edición de detalles
  editActivity(activity: ActivityDTO): void {
    this.selectedActivity = { ...activity };  // Clona la actividad seleccionada
    this.isEditPopupVisible = true;  // Muestra el popup de edición
  }

  // Método para cerrar el popup de edición de detalles 
  closeEditPopup(): void {
    this.isEditPopupVisible = false;
  }

  // Método para actualizar una actividad
  updateActivity(): void {
    if (this.selectedActivity.activityId) {
      this.http.put(`http://localhost:8080/activities/update/${this.selectedActivity.activityId}`, this.selectedActivity)
        .subscribe(() => {
          this.getActivities();  // Actualizar la lista de actividades después de la edición
          this.closeEditPopup();  // Cerrar el popup de edición
        }, error => {
          console.error('Error al actualizar la actividad', error);
        });
    } else {
      console.error('Error: El ID de la actividad es indefinido.');
    }
  }

  // Método para mostrar popup de actualización de estado
  updateStatus(activity: ActivityDTO): void {
    this.selectedActivity = { ...activity };
    this.isUpdateStatusPopupVisible = true;
  }

  // Método para cerrar el popup de actualización de estado
  closeUpdateStatusPopup(): void {
    this.isUpdateStatusPopupVisible = false;
  }

   // Método para actualizar el estado de una actividad
   updateActivityStatus(): void {
    const updateStatusUrl = `http://localhost:8080/activities/update-status/${this.selectedActivity.activityId}`;
    this.http.put(updateStatusUrl, this.statusUpdate)
      .subscribe(() => {
        this.getActivities();  // Actualizar la lista de actividades
        this.closeUpdateStatusPopup();  // Cerrar el popup
      }, error => {
        console.error('Error al actualizar el estado de la actividad', error);
      });
  }

  // Método para mostrar popup de confirmación para eliminación
  confirmDeleteActivity(activity: ActivityDTO): void {
    this.selectedActivity = activity;  // Selecciona la actividad para eliminar
    this.isDeletePopupVisible = true;  // Muestra el popup de eliminación
  }

  // Método para cerrar el popup de eliminación
  closeDeletePopup(): void {
    this.isDeletePopupVisible = false;
  }

  // Método para eliminar una actividad
  deleteActivity(): void {
    this.http.delete(`http://localhost:8080/activities/delete/${this.selectedActivity.activityId}`)
      .subscribe(() => {
        this.getActivities();  // Volver a cargar la lista de actividades después de eliminar
        this.closeDeletePopup();  // Cerrar el popup de eliminación
      }, error => {
        console.error('Error al eliminar la actividad', error);
      });
  }
}
