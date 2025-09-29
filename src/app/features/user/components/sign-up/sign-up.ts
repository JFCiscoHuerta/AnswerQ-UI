import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);

  registerUserForm: FormGroup;
  isLoading = false;

  constructor() {
    this.registerUserForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  signUp() {
    if (this.registerUserForm?.valid) {
      this.isLoading = true;
      const { confirmPassword, ...userData } = this.registerUserForm.value;
      this.userService.register(userData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/user/verify-account'],
            { queryParams: {email: this.registerUserForm.value.email } });
      },
        error: (err) => {
          this.isLoading = true;
          console.error('Error', err)
        }
      });
    } else {
      console.warn('Invalid Form');
    }
  }

}

