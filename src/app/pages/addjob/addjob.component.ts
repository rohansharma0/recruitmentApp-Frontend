import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/services/job.service';
@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css'],
})
export class AddjobComponent implements OnInit {
  constructor(
    private router: Router,
    private job: JobService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  addJobForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    skill: [null, Validators.required],
    minExperience: [null, Validators.required],
    maxExperience: [null, Validators.required],
  });

  addJob() {
    this.job.createJob(JSON.stringify(this.addJobForm.value)).subscribe(
      (res: any) => {
        this.addJobForm.reset();
        this.toastr.success('Job added Successfully.');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error('Something is wrong');
      }
    );
  }

  get form() {
    return this.addJobForm.controls;
  }

  ngOnInit(): void {}
}
