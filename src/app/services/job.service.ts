import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const url = 'http://localhost:9090/api';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  createJob(body: any) {
    return this.http.post(`${url}/job/`, body, {
      observe: 'body',
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', `Bearer ${this.auth.getToken()}`),
    });
  }

  updateJob(body: any, jobId: any) {
    return this.http.put(`${url}/job/${jobId}`, body, {
      observe: 'body',
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', `Bearer ${this.auth.getToken()}`),
    });
  }

  deleteJob(jobId: any) {
    return this.http.delete(`${url}/job/${jobId}`, {
      observe: 'body',
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', `Bearer ${this.auth.getToken()}`),
    });
  }

  getJobById(jobId: any) {
    return this.http.get(`${url}/job/${jobId}`, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getAllJobsByTitle(title: string) {
    console.log(title);

    return this.http.get(`${url}/job/search/title/${title}`, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getAllJobsBySkill(skill: any) {
    return this.http.get(`${url}/job/search/skill/${skill}`, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
  getAllJobs() {
    return this.http.get(`${url}/jobs/`);
  }
}
