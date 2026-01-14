import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Toast } from 'primeng/toast';
import { User } from './services/user';
import { DialogModule } from 'primeng/dialog';

import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { Header } from '../app/layouts/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Header, DialogModule, Login, Signup],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  visible: boolean = false;
  loginVisible: boolean = false;
  signupVisible: boolean = false;
  titleModal: string = '';
  @ViewChild('loginRef') loginComp!: Login;
  @ViewChild('signupRef') signupComp?: Signup;

  private sub: any;

  constructor(private router: Router, private user: User) {}

  ngOnInit() {
    // open login dialog when URL contains ?login=1
    this.sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      try {
        const tree = this.router.parseUrl(this.router.url || '');
        if (tree.queryParams && tree.queryParams['login']) {
          // if user not logged in, open modal; otherwise just clean the param
          if (!this.user.isLoggedIn()) {
            this.openLogin();
          }
          // remove query param so modal won't reopen on back/refresh
          try {
            this.router.navigate([], {
              queryParams: { login: null },
              queryParamsHandling: 'merge',
              replaceUrl: true,
            });
          } catch (e) {}
        }
      } catch (e) {}
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe?.();
  }

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
