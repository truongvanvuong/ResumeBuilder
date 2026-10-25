import { Component, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { environment } from 'src/environments/environment.prod';  

import { InputField } from '../../components/input-field/input-field';
import { User } from '../../services/user';
import { finalize } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, InputField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {

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
  ) { }
  ngAfterViewInit(): void {
    this.initGoogleBtn();
  }

  private initGoogleBtn(): void {
    let retryCount = 0;
    // Kiểm tra mỗi 100ms để đợi Dialog mở xong và thẻ div đã xuất hiện trong DOM
    const interval = setInterval(() => {
      const btn = document.getElementById('google-signin-btn');
      if (typeof google !== 'undefined' && btn) {
        clearInterval(interval);
        
        google.accounts.id.initialize({
          client_id: environment.googleClientId,
          callback: (res: any) => this.handleGoogleLogin(res),
        });

        google.accounts.id.renderButton(btn, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
        });
      }

      // Giới hạn thử tối đa 20 lần (2 giây) tránh chạy vô tận
      retryCount++;
      if (retryCount > 20) {
        clearInterval(interval);
      }
    }, 100);
  }


handleGoogleLogin(response : any){
  if(response.credential) {
    this.isLoading = true
  }
  this.UserServices.loginWithGoogle(response.credential).subscribe({
    next: (res) => {
        if (res?.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đăng nhập Google thành công',
            life: 1500,
          });
          this.loginCloseDialog.emit();
          this.resetForm();
        }
        this.isLoading = false;
      },
      
  })
}
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
              detail: 'Server error',
            };
          },
        });
    }
  }
}
