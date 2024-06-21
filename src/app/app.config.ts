// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routes } from './app.routes';

// Import your reducers and effects
import { reducer as userReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      ReactiveFormsModule,
      FormsModule, // Include FormsModule
      StoreModule.forRoot({ user: userReducer }), // Initialize the store with your reducer
      EffectsModule.forRoot([AuthEffects]), // Register your effects
      
    ),
  ],
};
