import { Component } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { Footer } from '../../../../shared/components/footer/footer';

@Component({
  selector: 'app-home-dashboard',
  imports: [
    Header,
    Footer
  ],
  templateUrl: './home-dashboard.html',
  styleUrl: './home-dashboard.css'
})
export class HomeDashboard {

}
