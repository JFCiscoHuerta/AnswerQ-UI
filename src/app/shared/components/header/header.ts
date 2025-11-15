import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/services/auth-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthRoutingModule } from "../../../features/auth/auth-routing-module";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    AuthRoutingModule,
    TranslateModule
],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  public router = inject(Router);
  public authService = inject(AuthService);
  public translate = inject(TranslateService);

  languages = [
    { code: 'en', label: 'EN', flag: 'https://flagcdn.com/us.svg' },
    { code: 'es', label: 'ES', flag: 'https://flagcdn.com/mx.svg' },
    { code: 'fr', label: 'FR', flag: 'https://flagcdn.com/fr.svg' },
  ];

  currentLang = this.translate.getCurrentLang() || 'en';
  currentLangFlag = this.getFlag(this.currentLang);

  changeLang(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    this.currentLangFlag = this.getFlag(lang);

    localStorage.setItem('lang', lang);
  }

  private getFlag(langCode: string): string {
    const lang = this.languages.find(l => l.code === langCode);
    return lang ? lang.flag : '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in'])
  }

}
