import { Component, EventEmitter, Output, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs/operators';

import { Popover } from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

import { User } from '../../services/user';
import { CurrentUser } from '../../types/user';

@Component({
  selector: 'app-header',
  imports: [AvatarModule, ButtonModule, RouterLink, Popover, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  @Output() OpenDialog = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();
  @Input() border: boolean = false;
  isLoggedIn: boolean = false;
  currentUser: CurrentUser | null = null;
  isOnDashboard: boolean = false;

  private userSub: any;
  private routeSub: any;
  constructor(
    private userService: User,
    private router: Router,
  ) {}

  ngOnInit() {
    // initial state
    this.isLoggedIn = this.userService.isLoggedIn();

    // subscribe to reactive currentUser so header updates immediately after login/signup
    this.userSub = this.userService.currentUser$.subscribe((u) => {
      this.currentUser = u;
      this.isLoggedIn = this.userService.isLoggedIn();
      // animate menu with small delay when logged in
    });

    // if token exists but currentUser not in BehaviorSubject, try load from localStorage
    if (!this.currentUser && this.isLoggedIn) {
      // try to read current user from the service first (synchronous)
      const fromService = this.userService.getCurrentUser();
      if (fromService) {
        this.currentUser = fromService;
      } else {
        // fallback to localStorage synchronously (avoid arbitrary setTimeout)
        try {
          const raw = localStorage.getItem('currentUser');
          if (raw) {
            this.currentUser = JSON.parse(raw);
          }
        } catch (e) {
          console.error('Failed to parse currentUser from localStorage', e);
        }
      }
    }

    // watch route changes to update header style and hide dashboard link on dashboard
    this.routeSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((ev: NavigationEnd) => {
        const url = ev.urlAfterRedirects || this.router.url || '';
        this.isOnDashboard = url.startsWith('/dashboard');
        this.border = this.isOnDashboard;
      });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  showDialog() {
    this.OpenDialog.emit();
  }

  logout() {
    // run a determinate progress bar, then perform logout
    this.logoutClick.emit();
  }
}
