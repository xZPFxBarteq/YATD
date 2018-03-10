import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider} from "angularx-social-login";
import {Router} from "@angular/router";

@Component({
  selector : 'login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {

  protected serverUrl : string = 'https://todos.venturedevs.net/'

  constructor(private authService : AuthService,
              private router : Router) {
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      if (user != null) {
        this.router.navigateByUrl('/lists');
      }
    });
  }

  loginWithGoogle() : void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginAnonymously() : void {
    this.router.navigateByUrl('/lists');
  }

}
