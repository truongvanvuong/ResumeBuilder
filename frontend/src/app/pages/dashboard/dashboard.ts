import { NgForm, FormsModule } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { finalize, Subscription } from 'rxjs';

import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import moment from 'moment';

import { InputField } from '../../components/input-field/input-field';
import { Resumecard } from '../../components/resumecard/resumecard';
import { Resume as ResumeService } from '../../services/resume';
import { GetResumesResponse, Resume, ResumeResponse } from '../../types/Resumes';

@Component({
  selector: 'app-dashboard',
  imports: [Resumecard, Dialog, InputField, FormsModule, InputTextModule, ButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  @ViewChild('creatResumeForm') resumeForm?: NgForm;
  isSubmitted: boolean = false;
  visible: boolean = false;
  pendingSuccess: boolean = false;
  resumes: GetResumesResponse = [];
  filteredResumes: GetResumesResponse = [];
  searchQuery: string = '';
  private sub?: Subscription;
  resumeTitle: string = '';
  isLoading: boolean = false;
  delayTime: number = 100;
  private pendingToast: { severity: string; summary: string; detail: string } | null = null;

  constructor(
    private resumeService: ResumeService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sub = this.resumeService
      .getAllResumes()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data) => {
          console.log('Fetched resumes in dashboard:', data);
          this.resumes = data;
          this.filteredResumes = data;
        },
        error: (err) => {
          console.error('Error fetching resumes in dashboard:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load resumes.',
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSearchChange(): void {
    this.filteredResumes = this.resumes.filter((resume) =>
      resume.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  handleDeleteResume(id: string) {
    this.resumes = this.resumes.filter((resume) => resume._id !== id);
    this.onSearchChange();
  }
  handleCloseDialog() {
    this.isSubmitted = false;
    this.resumeTitle = '';
    this.resumeForm?.resetForm({ resumeTitle: '' });
  }
  frommatDate(date: string): string {
    return moment(date).format('Do MMM YYYY');
  }
  openNewResumeDialog() {
    this.visible = true;
  }

  onCreateNewResume(form: NgForm) {
    this.isSubmitted = true;
    if (form.valid && this.resumeTitle !== '') {
      this.isLoading = true;
      this.resumeService
        .createResume({ title: this.resumeTitle })
        .pipe(
          finalize(() => {
            // keep loader visible a bit longer for better UX, then show pending toast
            setTimeout(() => {
              this.isLoading = false;
              if (this.pendingToast) {
                this.messageService.add({ ...this.pendingToast, life: 2000 });
                // if registration was successful, notify parent to close modal
                if (this.pendingSuccess) {
                  this.visible = false;
                  this.handleCloseDialog();
                }
                this.pendingToast = null;
                this.pendingSuccess = false;
              }
            }, this.delayTime);
          }),
        )
        .subscribe({
          next: (resume: ResumeResponse) => {
            // The service might be mistyped. The actual response is a wrapper object.
            console.log('Resume created successfully:', resume);
            if (resume?.success && resume.data) {
              setTimeout(() => {
                this.resumes.push(resume.data);
                this.onSearchChange();
              }, this.delayTime);
              this.pendingToast = {
                severity: 'success',
                summary: 'Success',
                detail: 'Create resume successfully',
              };
              this.pendingSuccess = true;
            } else {
              console.log('Create resume failed:', resume);
              this.pendingToast = {
                severity: 'error',
                summary: 'Error',
                detail: resume.message || 'Create resume failed',
              };
            }
          },
          error: (err) => {
            console.error('Error creating resume:', err);
            const message = err?.error?.message || err?.message || 'Server error';
            this.pendingToast = {
              severity: 'error',
              summary: 'Error',
              detail: message,
            };
            this.isLoading = false;
          },
        });
    }
  }
}
