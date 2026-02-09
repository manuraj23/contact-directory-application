import { Routes } from '@angular/router';
import { Login } from './login/login';

/*
  Application routes
  Each route loads a standalone component
*/
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.Login)
  },

  {
    path: 'user',
    loadComponent: () =>
      import('./user-dashboard/user-dashboard').then(
        m => m.UserDashboard
      )
  },

  {
    path: 'hr',
    loadComponent: () =>
      import('./hr-dashboard/hr-dashboard').then(
        m => m.HrDashboard
      )
  }
];
