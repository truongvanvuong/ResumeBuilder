import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { finalize } from 'rxjs/operators';

import { InputField } from '../../component/input-field/input-field';
import { User } from '../../services/user';
import { UserRegister } from '../../types/user';

@Component({
  selector: 'app-signup',
  imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, InputField],
  standalone: true,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  isLoading: boolean = false;
  messageError: string = '';
  isSubmitted: boolean = false;
  private pendingSuccess: boolean = false;
  /** Keep toast until loader finishes */
  private pendingToast: { severity: string; summary: string; detail: string } | null = null;
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  constructor(private userService: User, private messageService: MessageService) {}

  @ViewChild('signupForm') signupForm!: NgForm;
  @Output() loginClicked = new EventEmitter<void>();
  @Output() registeredCloseDialog = new EventEmitter<void>();

  onLoginClick() {
    this.loginClicked.emit();
  }

  resetForm() {
    this.user = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.isSubmitted = false;
    this.signupForm?.resetForm();
  }

  handleMatchPassword() {
    const matchPassword =
      this.user.password !== this.user.confirmPassword &&
      this.user.confirmPassword.length >= 6 &&
      this.user.password.length >= 6;

    if (matchPassword) {
      this.messageError = "Password doesn't match";
    } else {
      this.messageError = '';
    }
  }

  handleOnchangeconfirmPassword(value: string) {
    this.user.confirmPassword = value;
    this.handleMatchPassword();
  }

  handleOnchangePassword(value: string) {
    this.handleMatchPassword();
  }

  onSignup(form: NgForm) {
    this.isSubmitted = true;
    this.messageError = '';
    if (form.valid && this.user.password === this.user.confirmPassword) {
      this.isLoading = true;
      const payload: UserRegister = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      };
      this.userService
        .register(payload)
        .pipe(
          finalize(() => {
            // keep loader visible a bit longer for better UX, then show pending toast
            setTimeout(() => {
              this.isLoading = false;
              if (this.pendingToast) {
                this.messageService.add({ ...this.pendingToast, life: 600 });
                // if registration was successful, notify parent to close modal
                if (this.pendingSuccess) {
                  this.registeredCloseDialog.emit();
                  this.resetForm();
                }
                this.pendingToast = null;
                this.pendingSuccess = false;
              }
            }, 800);
          })
        )
        .subscribe({
          next: (res) => {
            if (res?.success) {
              this.pendingToast = {
                severity: 'success',
                summary: 'Success',
                detail: 'Create account successfully',
              };
              this.pendingSuccess = true;
            } else {
              this.pendingToast = {
                severity: 'warn',
                summary: 'Warning',
                detail: (res as any)?.message || 'Registration failed',
              };
            }
          },
          error: (err) => {
            const message = err?.error?.message || err?.message || 'Server error';
            console.error(message);
            this.pendingToast = {
              severity: 'error',
              summary: 'Error',
              detail: message,
            };
          },
        });
    } else {
      this.handleMatchPassword();
    }
  }
}
