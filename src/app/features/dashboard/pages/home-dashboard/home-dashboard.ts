import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsListComponent } from '../../components/forms-list-component/forms-list-component';

@Component({
  selector: 'app-home-dashboard',
  imports: [
    FormsListComponent
  ],
  templateUrl: './home-dashboard.html',
  styleUrl: './home-dashboard.css'
})
export class HomeDashboard {

}
