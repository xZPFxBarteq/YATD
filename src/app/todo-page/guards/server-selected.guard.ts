import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ServerService} from "../../shared/services/server.service";

@Injectable()
export class ServerSelectedGuard implements CanActivate {


  constructor(private server : ServerService,
              private router : Router) {
  }

  canActivate() : boolean {
    let serverSelected : boolean = !!this.server.getUrl();

    if(!serverSelected) {
      this.router.navigateByUrl('/login');
    }

    return serverSelected;
  }
}
