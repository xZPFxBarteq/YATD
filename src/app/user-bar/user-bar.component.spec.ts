import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBarComponent} from './user-bar.component';
import {MaterialModule} from "../modules/material.module";
import {AuthService, AuthServiceConfig, SocialUser} from "angularx-social-login";
import {Router, RouterModule} from "@angular/router";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {TodoFixture} from "../shared/classes/todo-fixture";
import {mock, instance, verify} from 'ts-mockito/lib/ts-mockito';

class AuthServiceMock extends AuthService {

}

describe('UserBarComponent', () => {
  let component : UserBarComponent;
  let fixture : TodoFixture<UserBarComponent>;

  let routerMock = mock(Router);
  let mockAuthService : AuthServiceMock;

  beforeEach(async(() => {
    mockAuthService = new AuthServiceMock(new AuthServiceConfig([]));
    TestBed.configureTestingModule({
      declarations : [UserBarComponent],
      imports : [MaterialModule, RouterModule],
      providers : [
        {provide : AuthService, useValue : mockAuthService},
        {provide : Router, useValue : instance(routerMock)}]
    })
      .compileComponents();
  }));

  it('should create', () => {
    setupAnonymousUser();
    expect(component).toBeTruthy();
  });

  it('should have correct greeting title', () => {
    setupLoggedUser();

    expect(fixture.cssQuery('.userbar-content span:first-child').textContent).toEqual('Hi testname!');
  });

  it('should have logout button for logged user', () => {
    setupLoggedUser();

    expect(fixture.cssQuery('.action').textContent).toEqual('Logout');
  });

  it('should have logout logged user', () => {
    setupLoggedUser();
    fixture.clickButton('.action');
    fixture.whenStable().then(() => {
      verify(routerMock.navigateByUrl('/login')).once();
    });
  });

  it('should have correct title for anonymous', () => {
    setupAnonymousUser();

    expect(fixture.cssQuery('.userbar-content span:first-child').textContent).toEqual('Yet Another To Do management app');
  });

  it('should have login page button for anonymous', () => {
    setupAnonymousUser();

    expect(fixture.cssQuery('.action').textContent).toEqual('Login page');
  });

  function setupLoggedUser() {
    spyOnProperty(mockAuthService, 'authState', 'get').and.returnValue(Observable.of(socialUser('testname')));
    spyOn(mockAuthService, 'signOut').and.returnValue(Promise.resolve());
    createComponent();
  }

  function setupAnonymousUser() {
    spyOnProperty(mockAuthService, 'authState', 'get').and.returnValue(Observable.of(null));
    createComponent();
  }

  function createComponent() {
    fixture = new TodoFixture<UserBarComponent>(TestBed.createComponent(UserBarComponent));
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function socialUser(name : string) : SocialUser {
    let user : SocialUser = new SocialUser();
    user.name = name;
    return user;
  }


});

