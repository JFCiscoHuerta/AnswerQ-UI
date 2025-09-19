import { Component, inject } from '@angular/core';
import { UserService } from '../../../features/user/services/user-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  public userService = inject(UserService);

  logout() {
    this.userService.logout();
    this.router.navigate(['/signin'])
  }

}
