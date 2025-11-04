import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserManagementService } from './user-management.service';

describe('UserManagementService', () => {
  let service: UserManagementService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        UserManagementService
      ]
    });

    service = TestBed.inject(UserManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /getAll', () => {
    service.getAllUsers().subscribe();
    const req = httpMock.expectOne('/api/UserManagement/getAll');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call GET /get/:id', () => {
    const id = '1';
    service.getUserById(id).subscribe();
    const req = httpMock.expectOne(`/api/UserManagement/get/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush({ id });
  });

  it('should call POST /create', () => {
    const data = { fullName: 'Amr Karim', email: 'amr@test.com', role: 'Admin' };
    service.createUser(data).subscribe();
    const req = httpMock.expectOne('/api/UserManagement/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call PUT /update/:id', () => {
    const id = '1';
    const data = { fullName: 'Updated Amr' };
    service.updateUser(id, data).subscribe();
    const req = httpMock.expectOne(`/api/UserManagement/update/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should call DELETE /delete/:id', () => {
    const id = '1';
    service.deleteUser(id).subscribe();
    const req = httpMock.expectOne(`/api/UserManagement/delete/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should call POST /deactivate/:id', () => {
    const id = '1';
    service.deactivateUser(id).subscribe();
    const req = httpMock.expectOne(`/api/UserManagement/deactivate/${id}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({});
  });

  it('should call POST /activate/:id', () => {
    const id = '1';
    service.activateUser(id).subscribe();
    const req = httpMock.expectOne(`/api/UserManagement/activate/${id}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({});
  });

  it('should call GET /roles', () => {
    service.getRoles().subscribe();
    const req = httpMock.expectOne('/api/UserManagement/roles');
    expect(req.request.method).toBe('GET');
    req.flush(['Admin', 'User']);
  });

  it('should call POST /updateRole/:id', () => {
    const id = '1';
    const role = 'Manager';
    service.updateUserRole(id, role).subscribe();
    const req = httpMock.expectOne(`/api/UserManagement/updateRole/${id}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ role });
    req.flush({});
  });
});
