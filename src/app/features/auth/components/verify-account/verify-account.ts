import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { VerifyUserDto } from '../../../auth/models/verifty-user-dto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-verify-account',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
],
  templateUrl: './verify-account.html',
  styleUrl: './verify-account.css'
})
export class VerifyAccount {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  verifyForm: FormGroup;
  email: string;
  isLoading = false;

  constructor(private route: ActivatedRoute) {
    this.verifyForm = this.formBuilder.group({
      verificationCode: ['', Validators.required]
    });
    this.email = '';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    })
  }

  verify() {
    if (this.verifyForm?.valid) {
      this.isLoading = true;
      const dto: VerifyUserDto = this.verifyForm.value;
      dto.email = this.email;

      this.authService.verify(dto).subscribe({
        next: res => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: err => {
          this.isLoading = false;
          console.warn('Error', err);
        }
      });
    }
  }

  resend() {
    const email = this.verifyForm.get('email')?.value;
    if (email) {
      this.authService.resend(email).subscribe({
        next: res => {
          console.log('Forwarded code');
          // Mostrar mensaje de que se verifico el correr
          this.router.navigate(['/auth/sign-in']);
        },
        error: err => {
          // Mostrar alerta de error
          console.warn('Error', err);
        }
      });
    }
  }

}
