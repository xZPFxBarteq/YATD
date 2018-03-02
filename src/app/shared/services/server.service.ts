import { Injectable } from '@angular/core';

@Injectable()
export class ServerService {

  serverUrl : string;

  constructor() {
  }

  public setServerUrl(serverUrl : string) : boolean {

    return true;
  }

}
