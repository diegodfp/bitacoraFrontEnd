import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDTO } from '../models/project.model'; // Define tu modelo para los proyectos
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar el pipe 'date'
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-admin-project-management',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-project-management.component.html',
  styleUrls: ['./admin-project-management.component.css']
})
export class AdminProjectManagementComponent implements OnInit {

  projects: ProjectDTO[] = [];  // Lista de proyectos
  selectedProject: ProjectDTO = {} as ProjectDTO; // Proyecto seleccionado para edición/eliminación
  assignment = { userId: '', projectId: 0, isLeader: 0 }; // Datos para la asignación de usuario
  isEditPopupVisible = false; // Control para mostrar el popup de edición
  isDeletePopupVisible = false; // Control para mostrar el popup de eliminación
  isAssignUserPopupVisible = false; // Control para mostrar el popup de asignación de usuarios

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getProjects();  // Cargar los proyectos cuando se inicialice el componente
  }

  // Método para obtener todos los proyectos
  getProjects(): void {
    this.http.get<any>('http://localhost:8080/projects/findAll')
      .subscribe(response => {
        this.projects = response.content; // 'content' viene de la estructura de paginación
      }, error => {
        console.error('Error al obtener los proyectos', error);
      });
  }

  editProject(project: ProjectDTO): void {
    console.log('Proyecto seleccionado:', project);  // Para verificar el proyecto seleccionado
    this.selectedProject = { ...project };  // Clona el proyecto seleccionado, el campo ahora es projectId
    this.isEditPopupVisible = true;  // Muestra el popup de edición
  }
  
  

  // Método para cerrar el popup de edición
  closeEditPopup(): void {
    this.isEditPopupVisible = false;
  }

  // Método para actualizar el proyecto
  updateProject(): void {
    if (this.selectedProject.projectId) {  // Verifica que el projectId esté definido
      this.http.put(`http://localhost:8080/projects/update/${this.selectedProject.projectId}`, this.selectedProject)
        .subscribe(() => {
          this.getProjects();  // Actualizar la lista de proyectos después de la edición
          this.closeEditPopup();  // Cerrar el popup de edición
        }, error => {
          console.error('Error al actualizar el proyecto', error);
        });
    } else {
      console.error('Error: El ID del proyecto es indefinido.');
    }
  }
  

  // Método para mostrar popup de confirmación para eliminación
  confirmDeleteProject(project: ProjectDTO): void {
    this.selectedProject = project;  // Selecciona el proyecto para eliminar
    this.isDeletePopupVisible = true;  // Muestra el popup de eliminación
  }

  // Método para cerrar el popup de eliminación
  closeDeletePopup(): void {
    this.isDeletePopupVisible = false;
  }

  // Método para eliminar un proyecto
  deleteProject(): void {
    this.http.delete(`http://localhost:8080/projects/delete/${this.selectedProject.projectId}`)
      .subscribe(() => {
        this.getProjects();  // Volver a cargar la lista de proyectos después de eliminar
        this.closeDeletePopup();  // Cerrar el popup de eliminación
      }, error => {
        console.error('Error al eliminar el proyecto', error);
      });
  }

  // Método para mostrar popup de asignación de usuario
  viewProjectDetails(projectId: number): void {
    this.assignment.projectId = projectId;  // Establece el ID del proyecto para la asignación
    this.isAssignUserPopupVisible = true;  // Muestra el popup de asignación de usuarios
  }

  // Método para cerrar el popup de asignación de usuario
  closeAssignUserPopup(): void {
    this.isAssignUserPopupVisible = false;
  }

  // Método para asignar usuario al proyecto
  assignUserToProject(): void {
    this.http.post('http://localhost:8080/api/project-assignments/assign', this.assignment)
      .subscribe(() => {
        this.getProjects();  // Actualiza la lista de proyectos después de la asignación
        this.closeAssignUserPopup();  // Cierra el popup de asignación de usuarios
      }, error => {
        console.error('Error al asignar el usuario al proyecto', error);
      });
  }
}
