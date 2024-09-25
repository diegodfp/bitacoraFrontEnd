import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) {}

  createActivity(activityData: any) {
    return this.http.post(`/activities/create`, activityData);
  }

  updateActivity(id: number, activityData: any) {
    return this.http.put(`/activities/update/${id}`, activityData);
  }

  deleteActivity(id: number) {
    return this.http.delete(`/activities/delete/${id}`);
  }
}
