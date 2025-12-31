import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../services/user';
import { CurrentUser } from '../../types/user';

@Component({
  selector: 'app-header',
  imports: [AvatarModule, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  @Output() OpenDialog = new EventEmitter<void>();
  isLoggedIn: boolean = false;
  currentUser: CurrentUser | null = null;

  private sub: any;
  constructor(private userService: User) {}

  ngOnInit() {
    // subscribe to reactive currentUser so header updates immediately after login/signup
    this.sub = this.userService.currentUser$.subscribe((u) => {
      this.currentUser = u;
      this.isLoggedIn = !!u && !this.userService.isTokenExpired();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe?.();
  }

  showDialog() {
    this.OpenDialog.emit();
  }

  logout() {
    // run a determinate progress bar, then perform logout
    this.userService.logout();
  }
}
