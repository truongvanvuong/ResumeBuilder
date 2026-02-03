import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { InputField } from '../../components/input-field/input-field';
import { User } from '../../services/user';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, InputField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  private pendingSuccess: boolean = false;
  /** Keep toast until loader finishes */
  private pendingToast: { severity: string; summary: string; detail: string } | null = null;

  user = {
    email: '',
    password: '',
  };

  @ViewChild('loginForm') loginForm?: NgForm;
  @Output() signupClicked = new EventEmitter<void>();
  @Output() loginCloseDialog = new EventEmitter<void>();

  constructor(
    private UserServices: User,
    private messageService: MessageService,
  ) {}

  resetForm() {
    this.user = { email: '', password: '' };
    this.isSubmitted = false;
    this.loginForm?.resetForm();
  }

  onSignupClick(e: Event) {
    e.stopPropagation();
    this.signupClicked.emit();
    this.resetForm();
  }

  onLogin(form: NgForm) {
    this.isSubmitted = true;
    if (form.valid) {
      this.isLoading = true;
      this.UserServices.login(this.user)
        .pipe(
          finalize(() => {
            // keep loader visible a bit longer for better UX, then show pending toast
            setTimeout(() => {
              this.isLoading = false;
              if (this.pendingToast) {
                this.messageService.add({ ...this.pendingToast, life: 600 });
                // if registration was successful, notify parent to close modal
                if (this.pendingSuccess) {
                  this.loginCloseDialog.emit();
                  this.resetForm();
                }
                this.pendingToast = null;
                this.pendingSuccess = false;
              }
            }, 800);
          }),
        )
        .subscribe({
          next: (res) => {
            console.log('Login response:', res);
            if (res?.success) {
              this.pendingToast = {
                severity: 'success',
                summary: 'Success',
                detail: res?.message || 'Login successfully',
              };
              this.pendingSuccess = true;
            } else {
              console.log('Login failed:', res);
              this.pendingToast = {
                severity: 'warn',
                summary: 'Warning',
                detail: (res as any)?.message || 'Login failed',
              };
            }
          },
          error: (err) => {
            const message = err?.error?.message || err?.message || 'Server error';
            console.error(err);
            this.pendingToast = {
              severity: 'error',
              summary: 'Error',
              detail: message,
            };
          },
        });
    }
  }
}
