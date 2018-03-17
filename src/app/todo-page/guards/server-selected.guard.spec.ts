import {inject, TestBed} from '@angular/core/testing';
import {mock, instance, when, verify} from 'ts-mockito';

import {ServerSelectedGuard} from './server-selected.guard';
import {ServerService} from "../../shared/services/server.service";
import {Router} from "@angular/router";

class ServerServiceMock extends ServerService {

}

describe('ServerSelectedGuard', () => {

  let serverServiceMock : ServerService = mock(ServerService);
  let routerMock : Router = mock(Router);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers : [
        ServerSelectedGuard,
        {provide : ServerService, useValue : instance(serverServiceMock)},
        {provide : Router, useValue : instance(routerMock)}]
    });
  });

  it('should return true if server is selected', inject([ServerSelectedGuard], (guard : ServerSelectedGuard) => {
    setupSelectedServer();
    expect(guard.canActivate()).toBeTruthy();
  }));

  it('should return false if server is not selected', inject([ServerSelectedGuard], (guard : ServerSelectedGuard) => {
    setupNotSelectedServer();
    expect(guard.canActivate()).toBeFalsy();
    verify(routerMock.navigateByUrl('/login')).once();
  }));

  function setupSelectedServer() : void {
    when(serverServiceMock.getUrl()).thenReturn('server');
  }

  function setupNotSelectedServer() : void {
    when(serverServiceMock.getUrl()).thenReturn(undefined);
  }

});
