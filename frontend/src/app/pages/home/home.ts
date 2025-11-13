import { Component, ViewChild } from '@angular/core';
import { Login } from '../../auth/login/login';
import { Signup } from '../../auth/signup/signup';
import { DialogModule } from 'primeng/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Login, DialogModule, Signup],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  visible: boolean = false;
  loginVisible: boolean = false;
  signupVisible: boolean = false;

  @ViewChild(Login) login!: Login;
  handleCloseDialog() {
    this.loginVisible = true;
    this.signupVisible = false;

    // 🔹 Gọi hàm reset form trong component con
    if (this.login) {
      this.login.resetForm();
    }
  }

  openLogin() {
    this.visible = true;
    this.loginVisible = true;
    this.signupVisible = false;
  }

  switchToSignup() {
    this.loginVisible = false;
    this.signupVisible = true;
    if (this.login) {
      this.login.resetForm();
    }
  }
}
