import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from './../../services/user-service';
import { Component, inject, OnInit } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth-service';
import { UserDetailsDto } from '../../models/user-details-dto';

@Component({
  selector: 'app-account-details',
  imports: [
    CommonModule,
    MatAnchor,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    TranslateModule],
  templateUrl: './account-details.html',
  styleUrl: './account-details.css'
})
export class AccountDetails implements OnInit {

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user?: UserDetailsDto;
  userId?: number;
  isLoading = false;

  constructor() {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  editProfile() {}

  changeProfilePicture() {}

  loadUserDetails() {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    if(!userId) {
      this.isLoading = false;
      throw new Error('Invalid User Id');
    }
    this.userService.userDetails(userId).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      }
    })
  }

}
