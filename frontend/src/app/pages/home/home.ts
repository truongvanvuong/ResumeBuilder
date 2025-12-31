import { Component, ViewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { Login } from '../../auth/login/login';
import { Signup } from '../../auth/signup/signup';

@Component({
  selector: 'app-home',
  imports: [Login, DialogModule, Signup, NgOptimizedImage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  visible: boolean = false;
  loginVisible: boolean = false;
  signupVisible: boolean = false;
  titleModal: string = '';
  @ViewChild('loginRef') loginComp!: Login;
  @ViewChild('signupRef') signupComp?: Signup;

  handleCloseDialog() {
    this.loginVisible = true;
    this.signupVisible = false;

    this.loginComp?.resetForm();
    this.signupComp?.resetForm();
  }
  onCloseDialog() {
    this.visible = false;
    this.handleCloseDialog();
  }

  openLogin() {
    this.titleModal = 'Login';
    this.visible = true;
    this.loginVisible = true;
  }

  switchToSignup() {
    this.titleModal = 'Signup';
    this.loginVisible = false;
    this.signupVisible = true;
    this.loginComp?.resetForm();
  }
  switchToLogin() {
    this.titleModal = 'Login';
    this.loginVisible = true;
    this.signupVisible = false;
    this.loginComp?.resetForm();
  }
}
