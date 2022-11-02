import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  userId: any;

  user: any;

  constructor(
    private routeParams: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private ref: ChangeDetectorRef,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    routeParams.params.subscribe((params) => {
      this.userId = params['userId'];
    });
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
