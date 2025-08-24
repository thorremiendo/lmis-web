import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { SwalService } from 'src/app/core/services/swal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup
  barangays = []
  municipalities = []
  selectedBarangay
  selectedMunicipality
  loading = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.dataService.getMunicipalities().subscribe(res => {
      this.municipalities = res
    })
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      barangay: new FormControl('', [Validators.required]),
      municipality: new FormControl('', [Validators.required])
    });
  }

  selectBarangay(barangay) {
    this.selectedBarangay = barangay;
    this.signupForm.get('barangay').setValue(barangay.id);
  }

  selectMunicipality(municipality) {
    this.selectedMunicipality = municipality;
    this.signupForm.get('municipality').setValue(municipality.id);
    this.dataService.getBarangays(municipality.id).subscribe(res => {
      this.barangays = res
      // switch (this.selectedMunicipality.id) {
      //   case 1:
      //     this.barangays = this.barangays.filter(e => e.name.includes("DONTOGAN"))
      //     break;
      //   case 2:
      //     this.barangays = this.barangays.filter(e => e.name.includes("PUGUIS"))
      //     break;
      //   case 3:
      //     this.barangays = this.barangays.filter(e => e.name.includes("AMPUCAO"))
      //     break;
      //   case 4:
      //     this.barangays = this.barangays.filter(e => e.name.includes("BANANGAN"))
      //     break;
      //   case 5:
      //     this.barangays = this.barangays.filter(e => e.name.includes("CAMP 3"))
      //     break;
      //   case 6:
      //     this.barangays = this.barangays.filter(e => e.name.includes("AMBASSADOR"))
      //     break;


      //   default:
      //     break;
      // }
    })
  }

  onRegister(e: Event) {
    e.preventDefault();
    if (this.signupForm.invalid || !this.selectedMunicipality || !this.selectedBarangay) {
      debugger
      this.swalService.showWarning(
        'Please fill out all required fields correctly.',
        'Invalid Form',
        'Close'
      );
      return;
    }
    this.loading = true;
    const rawContact = this.signupForm.value.contactNumber.toString().replace(/\D/g, '').slice(0, 11);
    const body = {
      username: this.signupForm.value.username,
      contactNumber: rawContact,
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      barangay: this.selectedBarangay.id,
      municipality: this.selectedMunicipality.id,
      role: "Others"
    }

    this.authService.register(body).subscribe(res => {
      this.loading = false;
      this.swalService.showSuccessMessage(
        '<b>Registration successful!</b><br>You can now log in with your new account.'
      );
        this.router.navigate(['/auth/login']);
    }, err => {
      this.loading = false;
      this.swalService.showWarning(
        (err.error.message || 'Please check your details and try again.'),
        'Signup Failed',
        'Close'
      );
    })

  }

}
