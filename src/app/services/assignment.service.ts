import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) {}

  assignUserToProject(assignmentData: any) {
    return this.http.post(`/api/project-assignments/assign`, assignmentData);
  }
}
