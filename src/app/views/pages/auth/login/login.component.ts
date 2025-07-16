import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SwalService } from 'src/app/core/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  public loginForm: FormGroup;
  loading = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private swalService: SwalService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    window.localStorage.clear()
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    this.loading = true;
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authService.login(body).subscribe((res) => {
      this.swalService.showSuccessMessage(
        '<b>Welcome back!</b><br>Your login was successful.'
      );
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('lmisUser', JSON.stringify(res.data));
      localStorage.setItem('lmisToken', res.token);

      if (localStorage.getItem('lmisUser')) {
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        }, 2000);
      }
    }, err => {
      this.loading = false;
      this.swalService.showWarning(
        (err.error.message || 'Please check your credentials and try again.'),
        'Login Failed',
        'Close'
      );
    })

  }

}
