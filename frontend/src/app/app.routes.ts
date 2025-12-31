import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
];
