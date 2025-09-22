import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignIn } from './components/sign-in/sign-in';
import { SignUp } from './components/sign-up/sign-up';
import { VerifyAccount } from './components/verify-account/verify-account';

const routes: Routes = [
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'verify-account', component: VerifyAccount }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
