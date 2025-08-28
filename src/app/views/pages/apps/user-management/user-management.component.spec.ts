import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementComponent } from './user-management.component';
import { UserManagementService, User } from 'src/app/core/services/user-management.service';
import { of, throwError } from 'rxjs';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let mockUserService: jasmine.SpyObj<UserManagementService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserManagementService', [
      'getAllUsers',
      'createUser',
      'updateUser',
      'deleteUser'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ UserManagementComponent ],
      imports: [ ReactiveFormsModule, NgbModule ],
      providers: [
        { provide: UserManagementService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const mockUsers: User[] = [
      { id: 1, username: 'testuser', role: 'LGU', firstName: 'Test', lastName: 'User', contactNumber: '09123456789' }
    ];
    mockUserService.getAllUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(mockUserService.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should handle error when loading users', () => {
    const error = { message: 'Error loading users' };
    mockUserService.getAllUsers.and.returnValue(throwError(() => error));

    component.loadUsers();

    expect(component.errorMessage).toContain('Error loading users');
  });

  it('should prevent deletion of admin users', () => {
    const adminUser: User = { id: 1, username: 'admin', role: 'Admin', firstName: 'Admin', lastName: 'User', contactNumber: '09123456789' };
    
    component.deleteUser(adminUser);
    
    expect(component.errorMessage).toContain('Admin users cannot be deleted');
    expect(mockUserService.deleteUser).not.toHaveBeenCalled();
  });

  it('should delete non-admin users successfully', () => {
    const regularUser: User = { id: 2, username: 'regular', role: 'LGU', firstName: 'Regular', lastName: 'User', contactNumber: '09123456789' };
    mockUserService.deleteUser.and.returnValue(of({}));
    
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.deleteUser(regularUser);
    
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(2);
  });

  it('should handle delete user error', () => {
    const regularUser: User = { id: 2, username: 'regular', role: 'LGU', firstName: 'Regular', lastName: 'User', contactNumber: '09123456789' };
    const error = { error: { message: 'User not found' } };
    mockUserService.deleteUser.and.returnValue(throwError(() => error));
    
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.deleteUser(regularUser);
    
    expect(component.errorMessage).toContain('User not found');
  });

  it('should correctly determine if user can be deleted', () => {
    const adminUser: User = { id: 1, username: 'admin', role: 'Admin', firstName: 'Admin', lastName: 'User', contactNumber: '09123456789' };
    const regularUser: User = { id: 2, username: 'regular', role: 'LGU', firstName: 'Regular', lastName: 'User', contactNumber: '09123456789' };
    
    expect(component.canDeleteUser(adminUser)).toBeFalse();
    expect(component.canDeleteUser(regularUser)).toBeTrue();
  });

  it('should have all fields as required in the form', () => {
    const form = component.userForm;
    
    expect(form.get('username')?.hasError('required')).toBeFalsy();
    expect(form.get('password')?.hasError('required')).toBeFalsy();
    expect(form.get('email')?.hasError('required')).toBeFalsy();
    expect(form.get('role')?.hasError('required')).toBeFalsy();
    expect(form.get('firstName')?.hasError('required')).toBeFalsy();
    expect(form.get('lastName')?.hasError('required')).toBeFalsy();
    expect(form.get('contactNumber')?.hasError('required')).toBeFalsy();
    expect(form.get('municipalityId')?.hasError('required')).toBeFalsy();
    expect(form.get('barangayId')?.hasError('required')).toBeFalsy();
    
    form.get('username')?.setValue('');
    form.get('password')?.setValue('');
    form.get('email')?.setValue('');
    form.get('role')?.setValue('');
    form.get('firstName')?.setValue('');
    form.get('lastName')?.setValue('');
    form.get('contactNumber')?.setValue('');
    form.get('municipalityId')?.setValue(null);
    form.get('barangayId')?.setValue(null);
    
    expect(form.get('username')?.hasError('required')).toBeTrue();
    expect(form.get('password')?.hasError('required')).toBeTrue();
    expect(form.get('email')?.hasError('required')).toBeTrue();
    expect(form.get('role')?.hasError('required')).toBeTrue();
    expect(form.get('firstName')?.hasError('required')).toBeTrue();
    expect(form.get('lastName')?.hasError('required')).toBeTrue();
    expect(form.get('contactNumber')?.hasError('required')).toBeTrue();
    expect(form.get('municipalityId')?.hasError('required')).toBeTrue();
    expect(form.get('barangayId')?.hasError('required')).toBeTrue();
  });

  it('should mark all form controls as touched when validation fails', () => {
    spyOn(component.userForm, 'markAsTouched');
    spyOn(component, 'markFormGroupTouched');
    
    component.userForm.setValue({
      username: '',
      password: '',
      email: '',
      role: '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      municipalityId: null,
      barangayId: null
    });
    
    component.onSubmit();
    
    expect(component.markFormGroupTouched).toHaveBeenCalled();
  });

  it('should open delete confirmation modal when deleteUser is called', () => {
    const regularUser: User = { id: 2, username: 'regular', role: 'LGU', firstName: 'Regular', lastName: 'User', contactNumber: '09123456789' };
    
    component.deleteUser(regularUser);
    
    expect(component.userToDelete).toEqual(regularUser);
  });

  it('should confirm delete and remove user when confirmDelete is called', () => {
    const regularUser: User = { id: 2, username: 'regular', role: 'LGU', firstName: 'Regular', lastName: 'User', contactNumber: '09123456789' };
    component.userToDelete = regularUser;
    component.users = [regularUser];
    mockUserService.deleteUser.and.returnValue(of({}));
    
    component.confirmDelete();
    
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(2);
    expect(component.users.length).toBe(0);
    expect(component.userToDelete).toBeNull();
  });

  it('should cancel delete and reset userToDelete when cancelDelete is called', () => {
    const regularUser: User = { id: 2, username: 'regular', role: 'LGU', firstName: 'Regular', lastName: 'User', contactNumber: '09123456789' };
    component.userToDelete = regularUser;
    
    component.cancelDelete();
    
    expect(component.userToDelete).toBeNull();
  });
});
