import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/services/auth-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthRoutingModule } from "../../../features/auth/auth-routing-module";

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    AuthRoutingModule
],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  public router = inject(Router);
  public authService = inject(AuthService);

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in'])
  }

}
