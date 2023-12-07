import { DialogModule } from '@alauda/ui';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  Provider,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { appRoutes } from './app.routes';
import en from './i18n/en.json';
import zh from './i18n/zh.json';

import {
  ApiGatewayInterceptor,
  AuthorizationInterceptorService,
  COMMON_RESOURCE_DEFINITIONS,
  DEFAULT_REMOTE_URL,
  TOKEN_RESOURCE_DEFINITIONS,
  TranslateModule,
  TranslateService,
} from '@alauda-fe/common';

const initializerProvides: Provider[] = [
  {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useValue: () => {
      const translate = inject(TranslateService);
      translate.locale$.subscribe(lang => {
        document.documentElement.setAttribute('lang', lang);
      });
    },
  },
];

const interceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiGatewayInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptorService,
    multi: true,
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loose: true,
        translations: {
          en: { ...en },
          zh: { ...zh },
        },
        remoteUrl: DEFAULT_REMOTE_URL,
      }),
    ),
    importProvidersFrom(DialogModule),
    {
      provide: TOKEN_RESOURCE_DEFINITIONS,
      useValue: COMMON_RESOURCE_DEFINITIONS,
    },
    ...initializerProvides,
    ...interceptorProviders,
  ],
};
