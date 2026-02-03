import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';

import { InputField } from '../../components/input-field/input-field';
import { getLightColorFromImage } from '../../shared/utils/getLightColor';
import { PopoverModule } from 'primeng/popover';
import { Resume } from '../../services/resume';

@Component({
  selector: 'app-resumecard',
  imports: [
    ButtonModule,
    PopoverModule,
    ConfirmDialogModule,
    Dialog,
    InputField,
    RouterLink,
    FormsModule,
    SkeletonModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './resumecard.html',
  styleUrl: './resumecard.css',
})
export class Resumecard implements OnChanges {
  // use a union type to allow null/undefined and provide a clear default
  @Input() id: string = '';
  @Input() imgUrl: string | null = null;
  @Input() titleResume: string = '';
  @Input() lastUpdated: string = '';
  @Output() deleted = new EventEmitter<string>();

  messsageError: string = '';
  oldTitle: string = '';
  visible: boolean = false;
  isLoading: boolean = false;
  isDeleting: boolean = false;

  bgColor: string = '#ffffff';
  constructor(
    private resumeService: Resume,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  handleRenameResume(value: string) {
    this.titleResume = value;
    if (this.titleResume.trim() === this.oldTitle.trim()) {
      this.messsageError = 'The title remains unchanged';
    } else {
      this.messsageError = '';
    }
  }
  RenameResumeTitle(form: NgForm) {
    this.messsageError = '';
    this.handleRenameResume(this.titleResume);
    if (form.valid && this.titleResume.trim() !== this.oldTitle.trim()) {
      this.isLoading = true;
      this.resumeService.updateResume(this.id, { title: this.titleResume.trim() }).subscribe({
        next: (data) => {
          this.titleResume = data.title;
          this.oldTitle = data.title;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Resume renamed successfully',
            life: 3000,
          });
          this.visible = false;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to rename resume', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to rename resume',
            life: 3000,
          });
          this.isLoading = false;
        },
      });
    }
  }

  handleCloseDialog() {
    this.titleResume = this.oldTitle;
    this.messsageError = '';
  }
  handleDeleteResume() {
    this.isDeleting = true;
    this.resumeService.deleteResume(this.id).subscribe({
      next: () => {
        setTimeout(() => {
          this.isDeleting = false;
          this.deleted.emit(this.id);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Resume deleted successfully',
          });
        }, 1000);
      },
      error: (err) => {
        this.isDeleting = false;
        console.error('Failed to delete resume', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete resume',
        });
      },
    });
  }
  onRename(title: string) {
    this.visible = true;
    this.oldTitle = title;
    this.messsageError = '';
  }
  onDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete this resume ${this.titleResume}?`,
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.handleDeleteResume();
      },
      reject: () => {},
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imgUrl']) {
      // set default image if imgUrl is null/undefined/empty
      if (this.imgUrl) {
        getLightColorFromImage(this.imgUrl)
          .then((color) => {
            this.bgColor = color;
          })
          .catch(() => {
            this.bgColor = '#ffffff';
          });
      }
    }
  }
}
