import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwoFactorService {
  private http = inject(HttpClient);
  private baseUrl = '/api/TwoFactorAuthentication';

  generateAuthenticatorKey(): Observable<any> {
    return this.http.get(`${this.baseUrl}/generate`);
  }

  enable2FA(data: { code: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/enable`, data);
  }

  disable2FA(): Observable<any> {
    return this.http.post(`${this.baseUrl}/disable`, {});
  }

  generateRecoveryCodes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/generateRecoveryCodes`);
  }

  verify2FACode(data: { code: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify`, data);
  }
}
