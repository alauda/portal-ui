import { Route } from '@angular/router';

import { ProductsPageComponent } from './products/component';

import {
  AuthorizationGuardService,
  DEFAULT_ABNORMAL_EMPTY_URL,
  DEFAULT_LICENSE_ERROR_URL,
} from '@alauda-fe/common';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductsPageComponent,
    canActivate: [AuthorizationGuardService],
  },
  {
    path: DEFAULT_LICENSE_ERROR_URL,
    loadComponent: () =>
      import('./boundaries/license-error-page/component').then(
        M => M.LicenseErrorPageComponent,
      ),
  },
  {
    path: DEFAULT_ABNORMAL_EMPTY_URL,
    loadComponent: () =>
      import('./boundaries/system-abnormal-page/component').then(
        M => M.SystemAbnormalPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
