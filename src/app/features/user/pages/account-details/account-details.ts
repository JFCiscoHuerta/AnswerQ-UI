import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from './../../services/user-service';
import { Component, inject, OnInit } from '@angular/core';
import { UserDetails } from '../../models/user-details-dto';
import { switchMap } from 'rxjs';
import { MatAnchor } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user?: UserDetails;
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

    this.route.paramMap.pipe(
      switchMap( params => {
          this.userId = Number(params.get('id'));
          if(!this.userId) {
            this.isLoading = false;
            throw new Error('Invalid User Id');
          }
          return this.userService.userDetails(this.userId);
        })
    ).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: err =>
        {
          console.error('Error fetching user data', err);
          this.isLoading = false;
        }
    })
  }

}
