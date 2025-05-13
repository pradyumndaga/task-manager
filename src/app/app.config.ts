import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appEffects, appStore } from './store/tasks.store';
import { provideEffects } from '@ngrx/effects';
import { TasksService } from './core/services/tasks.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideStore(appStore),
    provideEffects(appEffects),
    TasksService
  ]
};
