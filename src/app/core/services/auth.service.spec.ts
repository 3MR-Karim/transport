import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        AuthService
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call POST /register', () => {
    const data = { email: 'test@test.com', password: '123456' };
    service.register(data).subscribe();
    const req = httpMock.expectOne('/api/Users/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call POST /login', () => {
    const data = { email: 'test@test.com', password: '123456' };
    service.login(data).subscribe();
    const req = httpMock.expectOne('/api/Users/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call POST /refresh', () => {
    const data = { refreshToken: 'refresh123' };
    service.refresh(data).subscribe();
    const req = httpMock.expectOne('/api/Users/refresh');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call GET /confirmEmail', () => {
    const params = { userId: '1', code: 'abc' };
    service.confirmEmail(params).subscribe();
    const req = httpMock.expectOne(req => req.url.includes('/api/Users/confirmEmail'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('userId')).toBe('1');
    expect(req.request.params.get('code')).toBe('abc');
    req.flush({});
  });

  it('should call POST /resendConfirmationEmail', () => {
    const data = { email: 'test@test.com' };
    service.resendConfirmationEmail(data).subscribe();
    const req = httpMock.expectOne('/api/Users/resendConfirmationEmail');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call POST /forgotPassword', () => {
    const data = { email: 'test@test.com' };
    service.forgotPassword(data).subscribe();
    const req = httpMock.expectOne('/api/Users/forgotPassword');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call POST /resetPassword', () => {
    const data = { email: 'test@test.com', resetCode: '123', newPassword: 'newPass' };
    service.resetPassword(data).subscribe();
    const req = httpMock.expectOne('/api/Users/resetPassword');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });
});
