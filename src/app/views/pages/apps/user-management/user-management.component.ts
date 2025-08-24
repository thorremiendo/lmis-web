import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService, User } from 'src/app/core/services/user-management.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditing = false;
  editingUserId: number | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  modalRef: NgbModalRef | null = null;
  
  barangays = [];
  municipalities = [];
  selectedBarangay: any;
  selectedMunicipality: any;

  constructor(
    private userService: UserManagementService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private dataService: DataService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.email]],
      role: ['LGU', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
      municipalityId: [null],
      barangayId: [null]
    });
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('lmisUser') || '{}');
    
    if (user.role !== 'Admin') {
      this.router.navigate(['/dashboard'], { queryParams: { message: 'Access denied. Admin privileges required.' } });
      return;
    }
    
    this.loadUsers();
    this.loadMunicipalities();
  }

  loadMunicipalities(): void {
    this.dataService.getMunicipalities().subscribe(res => {
      this.municipalities = res;
    });
  }

  selectMunicipality(municipality: any): void {
    this.selectedMunicipality = municipality;
    this.userForm.get('municipalityId')?.setValue(municipality.id);
    this.selectedBarangay = null;
    this.userForm.get('barangayId')?.setValue(null);
    
    this.dataService.getBarangays(municipality.id).subscribe(res => {
      this.barangays = res;
    //   switch (this.selectedMunicipality.id) {
    //     case 1:
    //       this.barangays = this.barangays.filter(e => e.name.includes("DONTOGAN"));
    //       break;
    //     case 2:
    //       this.barangays = this.barangays.filter(e => e.name.includes("PUGUIS"));
    //       break;
    //     case 3:
    //       this.barangays = this.barangays.filter(e => e.name.includes("AMPUCAO"));
    //       break;
    //     case 4:
    //       this.barangays = this.barangays.filter(e => e.name.includes("BANANGAN"));
    //       break;
    //     case 5:
    //       this.barangays = this.barangays.filter(e => e.name.includes("CAMP 3"));
    //       break;
    //     case 6:
    //       this.barangays = this.barangays.filter(e => e.name.includes("AMBASSADOR"));
    //       break;
    //     default:
    //       break;
    //   }
    });
  }

  selectBarangay(barangay: any): void {
    this.selectedBarangay = barangay;
    this.userForm.get('barangayId')?.setValue(barangay.id);
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading users: ' + error.message;
        this.isLoading = false;
      }
    });
  }

  openCreateUserModal(content: any): void {
    this.isEditing = false;
    this.editingUserId = null;
    this.resetForm();
    this.modalRef = this.modalService.open(content, { size: 'lg', centered: true });
  }

  openEditUserModal(content: any, user: User): void {
    this.isEditing = true;
    this.editingUserId = user.id!;
    
    this.userForm.patchValue({
      username: user.username,
      password: '',
      email: user.email || '',
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      contactNumber: user.contactNumber,
      municipalityId: user.municipalityId || null,
      barangayId: user.barangayId || null
    });
    
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    
    if (user.municipalityId) {
      this.loadMunicipalities();
      this.dataService.getBarangays(user.municipalityId).subscribe(res => {
        this.barangays = res;
        this.selectedMunicipality = this.municipalities.find(m => m.id === user.municipalityId);
        this.selectedBarangay = this.barangays.find(b => b.id === user.barangayId);
      });
    }
    
    this.modalRef = this.modalService.open(content, { size: 'lg', centered: true });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const userData = this.userForm.value;

      if (this.isEditing && this.editingUserId) {
        this.userService.updateUser(this.editingUserId, userData).subscribe({
          next: (updatedUser) => {
            const index = this.users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
            }
            this.successMessage = 'User updated successfully!';
            this.closeModal();
            this.resetForm();
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Error updating user: ' + error.message;
            this.isLoading = false;
          }
        });
      } else {
        this.userService.createUser(userData).subscribe({
          next: (newUser) => {
            this.users.push(newUser);
            this.successMessage = 'User created successfully!';
            this.closeModal();
            this.resetForm();
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Error creating user: ' + error.message;
            this.isLoading = false;
          }
        });
      }
    }
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      this.isLoading = true;
      this.userService.updateUser(user.id!, { ...user, isActive: false }).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.successMessage = 'User deleted successfully!';
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error deleting user: ' + error.message;
          this.isLoading = false;
        }
      });
    }
  }

  resetForm(): void {
    this.userForm.reset({
      role: 'LGU'
    });
    this.isEditing = false;
    this.editingUserId = null;
    this.selectedMunicipality = null;
    this.selectedBarangay = null;
    this.barangays = [];
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin': return 'badge bg-danger';
      case 'LGU': return 'badge bg-primary';
      case 'LGA': return 'badge bg-success';
      case 'Others': return 'badge bg-secondary';
      default: return 'badge bg-secondary';
    }
  }
}
