import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";

@Component({
  selector : 'app-user-bar',
  templateUrl : './user-bar.component.html',
  styleUrls : ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  protected user : SocialUser;

  constructor(private authService : AuthService,
              private router : Router) {
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  isLoggedIn() : boolean {
    return this.user != null;
  }

  goToLogin() : void {
    this.router.navigateByUrl('/login');
  }

  logout() : void {
    this.authService.signOut().then(() => {
      this.goToLogin();
    });
  }


}
