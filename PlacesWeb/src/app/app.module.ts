import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GooglePlaceModule } from "./google-place.module";
import { HttpClientService, ModelService } from './services/http-client.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieHandler } from './services/cookie-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    GooglePlaceModule,
    RouterModule.forRoot(rootRouterConfig)
  ],
  providers: [
    HttpClientService,
    ModelService,
    CookieService,
    CookieHandler
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
