import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatOptionModule,
  MatSelectModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";

let authorizationConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("991607936961-c5fair5rk2mp0q05nv52e09ddjm3pp8f.apps.googleusercontent.com")
  }
]);

@NgModule({
  declarations : [
    AppComponent,
    LoginComponent
  ],
  imports : [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    SocialLoginModule.initialize(authorizationConfig)
  ],
  providers : [],
  bootstrap : [AppComponent]
})
export class AppModule {
}
