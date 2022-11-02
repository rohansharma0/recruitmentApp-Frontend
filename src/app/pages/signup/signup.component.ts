import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  registerForm: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(5)]),
    ],
  });

  moveToLogin() {
    this.router.navigate(['signin']);
  }
  register() {
    this.auth.register(JSON.stringify(this.registerForm.value)).subscribe(
      (res: any) => {
        this.auth
          .login({
            email: this.registerForm.get('email')?.value,
            password: this.registerForm.get('password')?.value,
          })
          .subscribe(
            (response: any) => {
              localStorage.setItem('token', response.token);
              localStorage.setItem('user', response.user);
              localStorage.setItem('userId', res.user?.id);
              localStorage.setItem('userRole', response.user?.roles[0]?.name);
              this.registerForm.reset();
              this.toastr.success('Register Successful.');
              this.router.navigate(['/']);
            },
            (error) => {
              this.toastr.error('Something is wrong');
            }
          );
      },
      (error) => {
        this.toastr.error('Something is wrong');
      }
    );
  }

  get form() {
    return this.registerForm.controls;
  }
  ngOnInit(): void {}
}
