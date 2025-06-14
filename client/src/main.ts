import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app/AppRoutes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(BrowserModule),
    provideRouter(ROUTES),
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor, multi: true },
    // { provide: RECAPTCHA_V3_SITE_KEY, useValue: APIKeys.RecaptchaSiteKey },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),

  ]
})
  .catch(err => console.error(err));


