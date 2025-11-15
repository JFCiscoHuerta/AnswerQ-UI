import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetails } from './pages/account-details/account-details';
import { AccountUpdate } from './pages/account-update/account-update';
import { ChangePassword } from './pages/change-password/change-password';
import { ChangeEmail } from './pages/change-email/change-email';

const routes: Routes = [
  { path: 'details', component: AccountDetails },
  { path: 'update', component: AccountUpdate },
  { path: 'change-password', component: ChangePassword },
  { path: 'change-email', component: ChangeEmail },
  { path: '', component: AccountDetails }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
