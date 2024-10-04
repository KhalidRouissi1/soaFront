import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from "@angular/router";
import { routes} from "./app.routes";
import {provideClientHydration} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideHttpClient } from '@angular/common/http';  // Provide HttpClient
export const appConfig: ApplicationConfig = {

  providers: [
    importProvidersFrom([BrowserAnimationsModule]),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient()
  ],

};
