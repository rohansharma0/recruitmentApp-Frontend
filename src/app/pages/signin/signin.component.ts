import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  loginForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(5)]),
    ],
  });

  moveToRegister() {
    this.router.navigate(['signup']);
  }
  login() {
    this.auth.login(JSON.stringify(this.loginForm.value)).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.user);
        localStorage.setItem('userId', res.user?.id);
        localStorage.setItem('userRole', res.user?.roles[0]?.name);
        this.loginForm.reset();
        this.toastr.success('Login Successful.');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error('Something is wrong');
      }
    );
  }

  get form() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {}
}
