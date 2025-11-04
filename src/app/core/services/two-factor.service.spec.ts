import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TwoFactorService } from './two-factor.service';

describe('TwoFactorService', () => {
  let service: TwoFactorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        TwoFactorService
      ]
    });

    service = TestBed.inject(TwoFactorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call GET /generate', () => {
    service.generateAuthenticatorKey().subscribe();
    const req = httpMock.expectOne('/api/TwoFactorAuthentication/generate');
    expect(req.request.method).toBe('GET');
    req.flush({ key: '123ABC' });
  });

  it('should call POST /enable', () => {
    const data = { code: '123456' };
    service.enable2FA(data).subscribe();
    const req = httpMock.expectOne('/api/TwoFactorAuthentication/enable');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({ success: true });
  });

  it('should call POST /disable', () => {
    service.disable2FA().subscribe();
    const req = httpMock.expectOne('/api/TwoFactorAuthentication/disable');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({ success: true });
  });

  it('should call GET /generateRecoveryCodes', () => {
    service.generateRecoveryCodes().subscribe();
    const req = httpMock.expectOne('/api/TwoFactorAuthentication/generateRecoveryCodes');
    expect(req.request.method).toBe('GET');
    req.flush({ codes: ['abc', 'def'] });
  });

  it('should call POST /verify', () => {
    const data = { code: '654321' };
    service.verify2FACode(data).subscribe();
    const req = httpMock.expectOne('/api/TwoFactorAuthentication/verify');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({ verified: true });
  });
});
