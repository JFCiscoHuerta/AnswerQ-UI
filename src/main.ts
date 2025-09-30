import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { TranslateService } from '@ngx-translate/core';

const savedLang = localStorage.getItem('lang') || 'en';

bootstrapApplication(App, appConfig)
  .then(ref => {
    const translate = ref.injector.get(TranslateService);
    translate.addLangs(['en', 'es', 'fr']);
    translate.setDefaultLang('en').subscribe(() => {
      translate.use(savedLang);
    });
  })
  .catch((err) => console.error(err));
