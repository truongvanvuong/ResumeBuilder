import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Dialog } from 'primeng/dialog';

import { Resumecard } from '../../component/resumecard/resumecard';
import { Resume } from '../../services/resume';
import { GetResumesResponse } from '../../types/Resumes';

@Component({
  selector: 'app-dashboard',
  imports: [Resumecard, Dialog],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  visible: boolean = false;
  resumes: GetResumesResponse = [];
  private sub?: Subscription;

  constructor(private resumeService: Resume) {}

  ngOnInit(): void {
    this.sub = this.resumeService.getAllResumes().subscribe({
      next: (data) => {
        console.log('Fetched resumes in dashboard:', data);
        this.resumes = data;
      },
      error: (err) => {
        console.error('Error fetching resumes in dashboard:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
