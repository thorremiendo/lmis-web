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
  public loginForm: FormGroup

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
    const body = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authService.login(body).subscribe((res) => {
      this.swalService.showSuccessMessage("Login Successful!")
      localStorage.setItem('isLoggedin', 'true');
      localStorage.setItem('lmisUser', JSON.stringify(res.data));
      localStorage.setItem('lmisToken', res.token);

      if (localStorage.getItem('lmisUser')) {
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 2000);
      }
    }, err => {
      console.log(err)
      this.swalService.showWarning(err.error.message, "Login Failed", "Close")
    })

  }

}
