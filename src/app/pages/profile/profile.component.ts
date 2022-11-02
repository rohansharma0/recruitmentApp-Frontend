import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private ref: ChangeDetectorRef,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  user: any;

  userId = localStorage.getItem('userId');

  ngOnInit(): void {
    this.auth.getUser(this.userId).subscribe(
      (user: any) => {
        this.user = user;
        this.ref.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editUserForm: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(5)]),
    ],
  });

  editUser() {
    this.auth
      .updateUser(JSON.stringify(this.editUserForm.value), this.userId)
      .subscribe(
        (res: any) => {
          this.editUserForm.reset();
          this.toastr.success('User edited successful.');
          this.router.navigate(['/']);
        },
        (error) => {
          this.toastr.error('Something is wrong');
        }
      );
  }
}
