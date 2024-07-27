import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

let Title = ''

const jsonData = localStorage.getItem('jsonData_Project');
if (jsonData) {
  document.title = JSON.parse(jsonData).projectTitle[0].title
} else {
  document.title="Project Navigator"
}