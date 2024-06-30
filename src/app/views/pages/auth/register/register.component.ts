import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.dataService.getMunicipalities().subscribe(res => {
      this.municipalities = res
      this.selectMunicipality(this.municipalities[0])
    })
    this.signupForm = new FormGroup({
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      contactNumber: new FormControl(''),
      password: new FormControl(''),
      barangay: new FormControl(""),
    });
  }

  selectBarangay(barangay) {
    this.selectedBarangay = barangay;
  }

  selectMunicipality(municipality) {
    this.selectedMunicipality = municipality;
    this.dataService.getBarangays(municipality.id).subscribe(res => {
      this.barangays = res
    })
  }

  onRegister(e: Event) {
    e.preventDefault();
    const body = {
      username: this.signupForm.value.username,
      contactNumber: this.signupForm.value.contactNumber.toString(),
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      barangay: this.selectedBarangay.id,
      role: "Others"
    }

    this.authService.register(body).subscribe(res => {
      this.swalService.showSuccessMessage("Signup Successful!")
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('lmisUser', JSON.stringify(res.data));
      localStorage.setItem('lmisToken', res.token);

      if (localStorage.getItem('lmisUser')) {
        this.router.navigate(['/auth/login']);
      }
    }, err => {
      console.log(err)
      this.swalService.showWarning(err.error.message, "Signup Failed", "Close")
    })

  }

}
