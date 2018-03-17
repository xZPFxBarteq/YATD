import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBarComponent} from './user-bar.component';
import {MaterialModule} from "../modules/material.module";
import {AuthService, AuthServiceConfig} from "angularx-social-login";
import {Router, RouterModule} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

class AuthServiceMock extends AuthService {

}

describe('UserBarComponent', () => {
  let component : UserBarComponent;
  let fixture : ComponentFixture<UserBarComponent>;

  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let mockAuthService : AuthServiceMock;

  beforeEach(async(() => {
    mockAuthService = new AuthServiceMock(new AuthServiceConfig([]));
    TestBed.configureTestingModule({
      declarations : [UserBarComponent],
      imports : [MaterialModule, RouterModule],
      providers : [
        {provide : AuthService, useValue : mockAuthService},
        {provide : Router, useValue : routerSpy}]
    })
      .compileComponents();
  }));

  it('should create', () => {
    setupAnonymousUser();
    expect(component).toBeTruthy();
  });

  it('should have correct greeting title', () => {
    setupLoggedUser();

    expect(fixture.nativeElement
      .querySelector('.userbar-content span:first-child')
      .textContent)
      .toEqual('Hi testname!');
  });

  it('should have logout button for logged user', () => {
    setupLoggedUser();

    expect(fixture.nativeElement
      .querySelector('.action')
      .textContent)
      .toEqual('Logout');
  });

  it('should have correct title for anonymous', () => {
    setupAnonymousUser();

    expect(fixture.nativeElement
      .querySelector('.userbar-content span:first-child')
      .textContent)
      .toEqual('Yet Another To Do management app');
  });

  it('should have login page button for anonymous', () => {
    setupAnonymousUser();

    expect(fixture.nativeElement
      .querySelector('.action')
      .textContent)
      .toEqual('Login page');
  });

  function setupLoggedUser() {
    spyOnProperty(mockAuthService, 'authState', 'get').and.returnValue(Observable.of({name : 'testname'}));
    createComponent();
  }

  function setupAnonymousUser() {
    spyOnProperty(mockAuthService, 'authState', 'get').and.returnValue(Observable.of(null));
    createComponent();
  }

  function createComponent() {
    fixture = TestBed.createComponent(UserBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }


});

