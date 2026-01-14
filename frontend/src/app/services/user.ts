import { CurrentUser } from './../types/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister, ApiAuthResponse, UserLogin } from '../types/user';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(this._loadCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  private currentUserKey = 'currentUser';
  private tokenKey = 'userToken';

  constructor(private http: HttpClient, private router: Router) {}
  register(user: UserRegister): Observable<ApiAuthResponse> {
    return this.http.post<ApiAuthResponse>(`${this.apiUrl}/auth/register`, user).pipe(
      tap((res) => {
        const { id, name, email, avatar, token } = (res.data || {}) as any;
        if (res.success && token) {
          this.setToken(token);
          const currentUser: CurrentUser = { id, name, email, avatar };
          this.setCurrentUser(currentUser);
        }
      })
    );
  }
  login(user: UserLogin): Observable<ApiAuthResponse> {
    return this.http.post<ApiAuthResponse>(`${this.apiUrl}/auth/login`, user).pipe(
      tap((res) => {
        console.log('Login response:', res);
        const { id, name, email, avatar, token } = (res.data || {}) as any;
        if (res.success && token) {
          this.setToken(token);
          const currentUser: CurrentUser = { id, name, email, avatar };
          this.setCurrentUser(currentUser);
        }
      })
    );
  }

  /**
   * Read token from localStorage (handles stringified storage)
   */
  getToken(): string | null {
    const raw = localStorage.getItem(this.tokenKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return raw;
    }
  }

  /**
   * Decode JWT payload safely
   */
  private decodeJwtPayload(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = atob(payload);
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  /**
   * Check if token is expired (assumes JWT 'exp' in seconds)
   */
  isTokenExpired(token?: string): boolean {
    const t = token || this.getToken();
    if (!t) return true;
    const payload = this.decodeJwtPayload(t);
    if (!payload || !payload.exp) return false; // if no exp, assume valid
    const now = Math.floor(Date.now() / 1000);
    return now >= payload.exp;
  }

  /**
   * Simple check whether user is logged in (has non-expired token)
   */
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  /**
   * Get current user object saved in localStorage (if any)
   */
  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Clear stored auth and (optionally) navigate away
   */
  logout(redirect = true) {
    this.setToken(null);
    this.setCurrentUser(null);
    if (redirect) {
      try {
        this.router.navigate(['/']);
      } catch (e) {
        // ignore
      }
    }
  }

  setToken(token: string | null) {
    if (token) {
      localStorage.setItem(this.tokenKey, JSON.stringify(token));
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  setCurrentUser(user: CurrentUser | null) {
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      this.currentUserSubject.next(user);
    } else {
      localStorage.removeItem(this.currentUserKey);
      this.currentUserSubject.next(null);
    }
  }

  private _loadCurrentUser(): CurrentUser | null {
    const raw = localStorage.getItem(this.currentUserKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as CurrentUser;
    } catch (e) {
      return null;
    }
  }
}
