import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  signIn() {
    if (this.loginForm?.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (res: LoginResponse) => {
          // Temporal: Change to Coockies Http-Only
          localStorage.setItem('token', res.token);
          // this.router.navigate(['/home']);
          console.log('Succesfully');
        },
        error: err => {
          console.error('Error', err);
        }
      });
    } else {
      console.warn('Invalid Form');
    }
  }

}
