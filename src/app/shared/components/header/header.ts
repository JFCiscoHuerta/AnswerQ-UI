import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  public router = inject(Router);
  public authService = inject(AuthService);

  logout() {
    this.authService.logout();
    this.router.navigate(['/sign-in'])
  }

}
