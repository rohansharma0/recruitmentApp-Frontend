import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private job: JobService,
    private ref: ChangeDetectorRef,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  jobs = [];

  ngOnInit(): void {
    this.job.getAllJobs().subscribe(
      (jobs: any) => {
        this.jobs = jobs;
        this.ref.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchForm: FormGroup = this.fb.group({
    search: [null, Validators.required],
  });

  searchText: string = '';

  handleSearch() {
    this.searchText = this.searchForm.controls['search'].value;
    this.job.getAllJobsByTitle(this.searchText).subscribe(
      (jobs: any) => {
        this.jobs = jobs;
        this.ref.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleApplyJob() {
    this.toastr.success('Applied job successfully');
  }

  handleSaveJob() {
    this.toastr.success('Saved job successfully');
  }
}
