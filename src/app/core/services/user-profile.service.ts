import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private http = inject(HttpClient);
  private baseUrl = '/api/UserProfile';

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProfile`);
  }

  updateProfile(data: { fullName: string; phoneNumber?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateProfile`, data);
  }

  changeEmail(data: { newEmail: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/changeEmail`, data);
  }

  changePassword(data: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/changePassword`, data);
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadProfileImage`, formData);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteAccount`);
  }
}
