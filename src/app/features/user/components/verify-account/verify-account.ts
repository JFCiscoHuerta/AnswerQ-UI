import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { VerifyUserDto } from '../../models/verifty-user-dto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './verify-account.html',
  styleUrl: './verify-account.css'
})
export class VerifyAccount {
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  verifyForm: FormGroup;
  email: string;

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
      const dto: VerifyUserDto = this.verifyForm.value;
      dto.email = this.email;

      this.userService.verify(dto).subscribe({
        next: res => {
          console.log('Account successfully verified');
          this.router.navigate(['/home']);
        },
        error: err => {
          console.log('Dto:', dto);
          console.log('Query Email: ', this.email);
          console.log('DTO Email Email: ', dto.email);
          console.log('Verification Code: ', dto.verificationCode);
          console.warn('Error', err);
        }
      });
    }
  }

  resend() {
    console.log('Resend Started');
    const email = this.verifyForm.get('email')?.value;
    console.log('Email: ', email);
    if (email) {
      this.userService.resend(email).subscribe({
        next: res => {
          console.log('Forwarded code');
        },
        error: err => {
          console.warn('Error', err);
        }
      });
    }
    console.log('Resend Finished');
  }

}
