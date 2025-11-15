import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canMatch: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard-module').then(m => m.DashboardModule)
  },
  {
    path: 'user',
    canMatch: [authGuard],
    loadChildren: () => import('./features/user/user-module').then(m => m.UserModule)
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
