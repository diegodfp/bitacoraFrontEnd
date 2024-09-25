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

  // LISTAS PARA ASIGNAR USUARIOS A PROYECTO
  departments: any[] = [];  // Lista de departamentos
  users: any[] = [];  // Lista de usuarios filtrados por departamento
  selectedDepartmentId: number | null = null;  // Departamento seleccionado

  constructor(private http: HttpClient, private router: Router, private departmentService: DepartmentService, 
    private userService: UserService , private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getProjects();  // Cargar los proyectos cuando se inicialice el componente
    this.getDepartments();
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

  assignUserToProject(): void {
    this.http.post('http://localhost:8080/api/project-assignments/assign', this.assignment)
      .pipe(
        catchError((error) => {
          let message = 'Ocurrió un error inesperado.';
          if (error.status === 500 && error.error.message.includes('El usuario ya está asignado a este proyecto')) {
            message = 'Error, El usuario ya está asignado a este proyecto.';
          }
          this.snackBar.open(message, 'Cerrar', {
            duration: 3000
          });
          return throwError(() => new Error(error));
        })
      )
      .subscribe(() => {
        this.getProjects();
        this.closeAssignUserPopup();
      });
  }

   // Obtener la lista de departamentos
   getDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  // Cuando se selecciona un departamento, obtener los usuarios
  onDepartmentSelect(): void {
    if (this.selectedDepartmentId) {
      this.userService.getUsersByDepartment(this.selectedDepartmentId).subscribe(users => {
        this.users = users;
      });
    }
  }
}
