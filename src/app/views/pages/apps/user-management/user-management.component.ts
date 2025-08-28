import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService, User } from 'src/app/core/services/user-management.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/services/data.service';
import { Router } from '@angular/router';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild('deleteConfirmModal') deleteConfirmModal!: TemplateRef<any>;
  
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  userForm: FormGroup;
  isEditing = false;
  editingUserId: number | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  modalRef: NgbModalRef | null = null;
  userToDelete: User | null = null;
  
  Math = Math;
  
  barangays = [];
  municipalities = [];
  allBarangays: any[] = [];
  selectedBarangay: any;
  selectedMunicipality: any;

  filterForm: FormGroup;
  searchForm: FormGroup;
  availableRoles = ['Admin', 'LGU', 'LGA', 'Others'];
  availableMunicipalities: any[] = [];
  availableBarangays: any[] = [];

  pagination = {
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0,
    totalPages: 0
  };

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
      email: ['', [Validators.required, Validators.email]],
      role: ['LGU', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^09\d{9}$/)]],
      municipalityId: [null, Validators.required],
      barangayId: [null, Validators.required]
    });

    this.filterForm = this.fb.group({
      role: [''],
      municipalityId: [''],
      barangayId: ['']
    });

    this.searchForm = this.fb.group({
      searchTerm: ['']
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
    this.setupFilterListeners();
  }

  setupFilterListeners(): void {
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.searchForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.filterForm.get('municipalityId')?.valueChanges.subscribe(municipalityId => {
      if (municipalityId) {
        this.dataService.getBarangays(parseInt(municipalityId)).subscribe(res => {
          this.availableBarangays = res;
        });
      } else {
        this.loadAllBarangaysForFiltering();
      }
    });
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    const searchTerm = this.searchForm.get('searchTerm')?.value?.toLowerCase().trim() || '';
    
    this.filteredUsers = this.users.filter(user => {
      let matchesRole = true;
      let matchesMunicipality = true;
      let matchesBarangay = true;
      let matchesSearch = true;

      if (filters.role && filters.role !== '') {
        matchesRole = user.role === filters.role;
      }

      if (filters.municipalityId && filters.municipalityId !== '') {
        matchesMunicipality = user.municipalityId === parseInt(filters.municipalityId);
      }

      if (filters.barangayId && filters.barangayId !== '') {
        matchesBarangay = user.barangayId === parseInt(filters.barangayId);
      }

      if (searchTerm) {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const username = user.username.toLowerCase();
        const email = (user.email || '').toLowerCase();
        
        matchesSearch = fullName.includes(searchTerm) || 
                       username.includes(searchTerm) || 
                       email.includes(searchTerm);
      }

      return matchesRole && matchesMunicipality && matchesBarangay && matchesSearch;
    });

    this.updatePagination();
    this.goToPage(1);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.searchForm.reset();
    this.filteredUsers = [...this.users];
    this.updatePagination();
    this.goToPage(1);
  }

  updatePagination(): void {
    this.pagination.totalItems = this.filteredUsers.length;
    this.pagination.totalPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
    
    if (this.pagination.currentPage > this.pagination.totalPages) {
      this.pagination.currentPage = 1;
    }
    
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = startIndex + this.pagination.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pagination.currentPage = page;
      this.updatePaginatedUsers();
    }
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.pagination.totalPages);
  }

  goToPreviousPage(): void {
    this.goToPage(this.pagination.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.pagination.currentPage + 1);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const totalPages = this.pagination.totalPages;
    const currentPage = this.pagination.currentPage;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      }
    }
    
    return pages;
  }

  loadMunicipalities(): void {
    this.dataService.getMunicipalities().subscribe(res => {
      this.municipalities = res;
      this.availableMunicipalities = res;
      this.loadAllBarangaysForFiltering();
    });
  }

  selectMunicipality(municipality: any): void {
    this.selectedMunicipality = municipality;
    this.userForm.get('municipalityId')?.setValue(municipality.id);
    this.selectedBarangay = null;
    this.userForm.get('barangayId')?.setValue(null);
    
    this.dataService.getBarangays(municipality.id).subscribe(res => {
      this.barangays = res;
      this.availableBarangays = res;
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
        this.filteredUsers = [...users];
        this.isLoading = false;
        
        this.updatePagination();
      },
      error: (error) => {
        this.errorMessage = 'Error loading users: ' + error.message;
        this.isLoading = false;
      }
    });
  }

  loadAllBarangaysForFiltering(): void {
    this.availableBarangays = [];
    this.allBarangays = [];
    
    this.municipalities.forEach(municipality => {
      this.dataService.getBarangays(municipality.id).subscribe(res => {
        this.availableBarangays = [...this.availableBarangays, ...res];
        this.allBarangays = [...this.allBarangays, ...res];
        
        this.availableBarangays = this.availableBarangays.filter((barangay, index, self) => 
          index === self.findIndex(b => b.id === barangay.id)
        );
        this.allBarangays = this.allBarangays.filter((barangay, index, self) => 
          index === self.findIndex(b => b.id === barangay.id)
        );
      });
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
    } else {
      this.loadMunicipalities();
      this.selectedMunicipality = null;
      this.selectedBarangay = null;
      this.barangays = [];
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
            this.applyFilters();
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
            this.applyFilters();
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Error creating user: ' + error.message;
            this.isLoading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  deleteUser(user: User): void {
    if (user.role === 'Admin') {
      this.errorMessage = 'Admin users cannot be deleted';
      return;
    }

    this.userToDelete = user;
    this.modalRef = this.modalService.open(this.deleteConfirmModal, { 
      size: 'sm', 
      centered: true,
      backdrop: 'static'
    });
  }

  confirmDelete(): void {
    if (this.userToDelete) {
      this.isLoading = true;
      this.userService.deleteUser(this.userToDelete.id!).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== this.userToDelete?.id);
          this.applyFilters();
          this.successMessage = `User "${this.userToDelete.firstName} ${this.userToDelete.lastName}" has been deleted successfully!`;
          this.closeModal();
          this.userToDelete = null;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error deleting user: ' + (error.error?.message || error.message || 'Unknown error occurred');
          this.isLoading = false;
        }
      });
    }
  }

  cancelDelete(): void {
    this.userToDelete = null;
    this.closeModal();
  }

  resetForm(): void {
    this.userForm.reset({
      role: 'LGU',
      email: '',
      municipalityId: null,
      barangayId: null
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

  canDeleteUser(user: User): boolean {
    return user.role !== 'Admin';
  }

  getMunicipalityName(municipalityId: number | null): string {
    if (!municipalityId) return 'N/A';
    const municipality = this.municipalities.find(m => m.id === municipalityId);
    return municipality ? municipality.name : 'N/A';
  }

  getBarangayName(barangayId: number | null): string {
    if (!barangayId) return 'N/A';
    const barangay = this.allBarangays.find(b => b.id === barangayId);
    return barangay ? barangay.name : 'N/A';
  }
}
