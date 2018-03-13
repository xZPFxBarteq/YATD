import {Injectable} from '@angular/core';
import {SessionStorageService} from "angular-web-storage";

@Injectable()
export class ServerService {

  private serverUrl : string;

  constructor(private sessionStorage : SessionStorageService) {
    this.serverUrl = this.sessionStorage.get('serverUrl');
  }

  public setServerUrl(serverUrl : string) : void {
    this.sessionStorage.set('serverUrl', serverUrl);
    this.serverUrl = serverUrl;
  }

  public getUrl(endpoint? : string) : string {
    return this.serverUrl + endpoint;
  }

}
