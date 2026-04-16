import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { mockApiInterceptor } from './core/interceptors/mock-api.interceptor';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes, withHashLocation()),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideAnimationsAsync(),
  ],
};
