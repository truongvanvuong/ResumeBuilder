import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { AvatarModule } from 'primeng/avatar';

import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';

import { InputField } from '../../../components/input-field/input-field';
import { Progress } from '../../../services/progress';
import { Editor } from '../../../components/editor/editor'
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profileinfo',
  imports: [
    AvatarModule,
    InputField,
    ProgressBarModule,
    NgClass,
    Editor,
    ReactiveFormsModule,
    MessageModule,

  ],
  providers: [Progress],
  templateUrl: './profileinfo.html',
  styleUrl: './profileinfo.css',
})
export class Profileinfo {
  @Input() profileForm!: FormGroup;
  @Input() errMessage: string = '';
  previewUrl: string = '';
  uploading: boolean = false;
  uploadUrl: string | null = null;
  isProgress: boolean = true;
  valueProgress: Number = 0;

  constructor(
    private http: HttpClient,
    private progressService: Progress,
  ) {
    this.progressService.progress$.subscribe((state) => {
      this.isProgress = state.isHidden;
      this.valueProgress = state.value;
    });
  }

  get FullName() {
    return this.profileForm.get('fullName');
  }
  get designation() {
    return this.profileForm.get('designation');
  }
  get summary() {
    return this.profileForm.get('summary');
  }

  removeImage($event: Event, previvewUrl: string) {
    $event.stopPropagation();
    if (previvewUrl) {
      URL.revokeObjectURL(previvewUrl);
    }
    this.previewUrl = '';
    this.profileForm.patchValue({
      profileImg: '',
      previewUrl: ''
    });
  }
  uploadToServer(file: File) {
    this.uploading = true;

    const formData = new FormData();
    formData.append('file', file);
  }

  async onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      return;
    }
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }

    // Bắt đầu progress và upload
    this.uploading = true;
    await this.progressService.startProgress(10); // Chờ progress chạy từ 10 → 100%
    this.previewUrl = URL.createObjectURL(file);

    this.profileForm.patchValue({
      profileImg: this.previewUrl,
      previewUrl: this.previewUrl
    });
    this.uploading = false;
    this.progressService.hide();
  }



}
