import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDTO } from '../models/project.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {}

 // Obtener todos los proyectos desde el backend
 getProjects(): Observable<ProjectDTO[]> {
  return this.http.get<any>('http://localhost:8080/projects/findAll')
    .pipe(
      map(response => response.content)  // Extraer el array 'content'
    );
}

createProject(projectData: any): Observable<any> {
  return this.http.post('/projects/create', projectData);
}

  // Actualizar un proyecto
  updateProject(id: number, projectData: any) {
    return this.http.put(`/projects/update/${id}`, projectData);
  }

  // Eliminar un proyecto
  deleteProject(id: number) {
    return this.http.delete(`/projects/delete/${id}`);
  }
}
