import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:9090/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body: any) {
    return this.http.post(`${url}/v1/auth/login/`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  register(body: any) {
    return this.http.post(`${url}/v1/auth/register/`, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }

  isLoggedin() {
    return (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token') !== undefined &&
      localStorage.getItem('token') !== ''
    );
  }

  isAdmin() {
    return localStorage.getItem('userRole') === 'ROLE_ADMIN';
  }

  getUser(userId: any) {
    return this.http.get(`${url}/user/${userId}`, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  getAllUser() {
    return this.http.get(`${url}/users/`);
  }

  updateUser(body: any, userId: any) {
    return this.http.put(`${url}/user/${userId}`, body, {
      observe: 'body',
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', `Bearer ${this.getToken()}`),
    });
  }

  updateUserPassword(body: any, userId: any) {
    return this.http.put(`${url}/user/reset-password/${userId}`, body, {
      observe: 'body',
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', `Bearer ${this.getToken()}`),
    });
  }

  deleteUser(userId: any) {
    return this.http.delete(`${url}/user/${userId}`, {
      observe: 'body',
      headers: new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', `Bearer ${this.getToken()}`),
    });
  }
}
