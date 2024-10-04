import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { UserComponent } from './app/pages/user/user.component';
bootstrapApplication(AppComponent, {
  ...appConfig,
})
  .catch(err => console.error(err));
