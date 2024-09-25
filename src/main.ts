// main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // Importa HttpClientModule aquí
    provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(),
  ],
}).catch(err => console.error(err));
