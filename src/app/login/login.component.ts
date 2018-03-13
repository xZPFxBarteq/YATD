import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider} from "angularx-social-login";
import {Router} from "@angular/router";
import {ServerService} from "../shared/services/server.service";

@Component({
  selector : 'login',
  templateUrl : './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {

  protected serverUrl : string = 'https://todos.venturedevs.net/'

  constructor(private server : ServerService,
              private authService : AuthService,
              private router : Router) {
  }

  ngOnInit() {
    this.changeServerUrl();
    this.authService.authState.subscribe(user => {
      if (user != null) {
        this.router.navigateByUrl('/lists');
      }
    });
  }

  public changeServerUrl() : void {
    this.server.setServerUrl(this.serverUrl);
  }

  public loginWithGoogle() : void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public loginAnonymously() : void {
    this.router.navigateByUrl('/lists');
  }

}
