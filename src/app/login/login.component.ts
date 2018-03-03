import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from "angularx-social-login";

@Component({
  selector : 'app-login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {

  protected user : SocialUser;
  protected serverUrl : string = 'https://todos.venturedevs.net/'

  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  loginWithGoogle() : void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  isLoggedIn() : boolean {
    return this.user != null;
  }

}
