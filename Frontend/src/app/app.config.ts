import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { NestedService } from './services/nested.service';
import { INestedService } from './services/inested.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { NESTED_SERVICE_TOKEN } from './services/nested.service.token';


registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideRouter(routes),
        importProvidersFrom(RouterModule),
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(ReactiveFormsModule),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'manual',
                    cssLayer: false,
                    ripple: true,
                },
            },
        }),
        { provide: 'API_URL', useValue: 'http://localhost:5243/api' },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: AuthService, useClass: AuthService },
        { provide: NESTED_SERVICE_TOKEN, useClass: NestedService },
        { provide: ApiService, useClass: ApiService },

    ],
};