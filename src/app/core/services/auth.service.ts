import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = '/api/Users';

  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: {
    email: string;
    password: string;
    twoFactorCode?: string;
    twoFactorRecoveryCode?: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  refresh(data: { refreshToken: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/refresh`, data);
  }

  confirmEmail(params: { userId: string; code: string; changedEmail?: string }): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirmEmail`, { params });
  }

  resendConfirmationEmail(data: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/resendConfirmationEmail`, data);
  }

  forgotPassword(data: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgotPassword`, data);
  }

  resetPassword(data: { email: string; resetCode: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }
}
