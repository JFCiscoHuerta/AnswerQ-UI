import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard-module').then(m => m.DashboardModule) },
  { path: 'user', loadChildren: () => import('./features/user/user-module').then(m => m.UserModule) },
];
