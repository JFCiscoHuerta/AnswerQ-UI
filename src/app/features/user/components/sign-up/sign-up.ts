import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule
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

  constructor() {
    this.registerUserForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    })
  }

  signUp() {
    if (this.registerUserForm?.valid) {
      this.userService.register(this.registerUserForm.value).subscribe({
        next: () => this.router.navigate(['/user/verify-account'], { queryParams: {email: this.registerUserForm.value.email } }),
        error: (err) => console.error('Error', err)
      });
    } else {
      console.warn('Invalid Form');
    }
  }

}

