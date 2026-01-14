import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { User } from '../services/user';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(User);
  const router = inject(Router);

  try {
    const ok = user.isLoggedIn();
    if (ok) return true;
  } catch (e) {
    // ignore and redirect
  }

  return router.parseUrl('/home?login=1');
};
