import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

import { fetchGlobalEnvironments, recordInitUrl } from '@alauda-fe/common';

if (environment.production) {
  enableProdMode();
}

recordInitUrl();

fetchGlobalEnvironments(() => {
  bootstrapApplication(AppComponent, appConfig).catch(err =>
    console.error(err),
  );
});
