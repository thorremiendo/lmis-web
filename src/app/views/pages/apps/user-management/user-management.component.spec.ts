import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from '../../../core/services/user-management.service';
import { of, throwError } from 'rxjs';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture<UserManagementComponent>;
  let mockUserService: jasmine.SpyObj<UserManagementService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserManagementService', [
      'getAllUsers',
      'createUser',
      'updateUser'
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
    const mockUsers = [
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
});
