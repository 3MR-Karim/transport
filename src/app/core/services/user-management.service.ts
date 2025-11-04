import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private http = inject(HttpClient);
  private baseUrl = '/api/UserManagement';

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  createUser(data: { fullName: string; email: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  updateUser(id: string, data: { fullName?: string; email?: string; role?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  deactivateUser(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/deactivate/${id}`, {});
  }

  activateUser(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/activate/${id}`, {});
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/roles`);
  }

  updateUserRole(id: string, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateRole/${id}`, { role });
  }
}
