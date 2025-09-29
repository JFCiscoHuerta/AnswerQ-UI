import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { VerifyAccount } from './pages/verify-account/verify-account';

const routes: Routes = [
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'verify-account', component: VerifyAccount }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
