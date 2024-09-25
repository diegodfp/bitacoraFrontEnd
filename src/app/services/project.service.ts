import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {}

  updateProject(id: number, projectData: any) {
    return this.http.put(`/projects/update/${id}`, projectData);
  }

  deleteProject(id: number) {
    return this.http.delete(`/projects/delete/${id}`);
  }
}
