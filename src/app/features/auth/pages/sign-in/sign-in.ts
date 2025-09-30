import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginResponse } from '../../models/login-response';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    TranslateModule
],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup;
  isLoading = false;

  constructor(private translate: TranslateService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  signIn() {
    if (this.loginForm?.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: LoginResponse) => {
          // Temporal: Change to Cookies Http-Only
          localStorage.setItem('token', res.token);

          this.isLoading = false;
          if (!res.verified) {
            this.router.navigate(['/auth/verify-account'], {queryParams: {email: this.loginForm.value.email}});
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: err => {
          this.isLoading = false;
          console.error('Error', err);
        }
      });
    } else {
      console.warn('Invalid Form');
    }
  }

}
