import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, NgForm } from '@angular/forms';
import { InputField } from '../../component/input-field/input-field';
@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule, PasswordModule, FormsModule, InputField],

  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user = {
    email: '',
    password: '',
  };
  @ViewChild('loginForm') loginForm!: NgForm;
  @Output() signupClicked = new EventEmitter<void>();
  onSignupClick() {
    this.signupClicked.emit();
  }
  resetForm() {
    if (this.loginForm) {
      this.loginForm.resetForm();
    }
  }
  onLogin(form: any) {
    console.log(this.user.email);
    if (form.valid) {
      console.log('login successful', this.user);
      form.resetForm();
    }
  }
}
