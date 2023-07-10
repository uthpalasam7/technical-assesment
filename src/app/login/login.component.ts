import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }
  result: any;
  errors: any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.getUserbyId(this.loginform.value.id).subscribe(
        (item) => {
          this.result = item;
          if (this.result.password === this.loginform.value.password) {
            sessionStorage.setItem('username', this.result.id);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Invalid credentials');
          }
        },
        (error) => {
          this.errors = error;
          this.toastr.error('Invalid credentials');
        }
      );
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
