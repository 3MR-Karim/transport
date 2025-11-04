import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserProfileService } from './user-profile.service';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        UserProfileService
      ]
    });

    service = TestBed.inject(UserProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call GET /getProfile', () => {
    service.getProfile().subscribe();
    const req = httpMock.expectOne('/api/UserProfile/getProfile');
    expect(req.request.method).toBe('GET');
    req.flush({ fullName: 'Amr Karim' });
  });

  it('should call PUT /updateProfile', () => {
    const data = { fullName: 'Amr Karim', phoneNumber: '01000000000' };
    service.updateProfile(data).subscribe();
    const req = httpMock.expectOne('/api/UserProfile/updateProfile');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call POST /changeEmail', () => {
    const data = { newEmail: 'amr@test.com' };
    service.changeEmail(data).subscribe();
    const req = httpMock.expectOne('/api/UserProfile/changeEmail');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call POST /changePassword', () => {
    const data = { currentPassword: 'oldPass', newPassword: 'newPass' };
    service.changePassword(data).subscribe();
    const req = httpMock.expectOne('/api/UserProfile/changePassword');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call POST /uploadProfileImage', () => {
    const formData = new FormData();
    formData.append('image', new Blob(), 'photo.jpg');
    service.uploadProfileImage(formData).subscribe();
    const req = httpMock.expectOne('/api/UserProfile/uploadProfileImage');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call DELETE /deleteAccount', () => {
    service.deleteAccount().subscribe();
    const req = httpMock.expectOne('/api/UserProfile/deleteAccount');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
