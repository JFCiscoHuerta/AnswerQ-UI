import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { VerifyUserDto } from '../../models/verifty-user-dto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-verify-account',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslateModule
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
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private translate: TranslateService) {
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
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.isLoading = false;

          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          }

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
