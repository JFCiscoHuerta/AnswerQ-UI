import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboard } from './pages/home-dashboard/home-dashboard';

const routes: Routes = [
  { path: '', component: HomeDashboard },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
