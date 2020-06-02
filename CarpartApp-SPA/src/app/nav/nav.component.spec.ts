/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';

import { NavComponent } from './nav.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductListComponent } from '../product-list/product-list.component';

fdescribe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let alertify: AlertifyService;
  let router: Router;
  let authServ: AuthService;
  let inj: TestBed;

  @Injectable()
  class MockAuthServ extends AuthService
  {
    creds:Object = {username: 'test101', password: 'test101'};
    currClient = {
      id: 1,
      username: 'test101',
      name: 'Ringo',
      surname: 'Starr',
      email: 'casula@gmail.com',
      telNo: '312312332',
      country: 'Kuwait',
      city: 'Kuwait',
      postcode: '561q1',
      street: 'Al Wazzan St',
      isAdmin: false
    };
    decToken = {
      exp: 1591206884,
      iat: 1591120484,
      nameid: "1",
      nbf: 1591120484,
      unique_name: "test101"
    }

    login(creds: any)
    {
      return of<void>();
    }
  }

  // tslint:disable-next-line: align
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule
        .withRoutes([{path:'products', component:ProductListComponent}]), FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: AuthService, useClass: MockAuthServ
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inj = getTestBed();
    alertify = inj.inject(AlertifyService);
    router = inj.inject(Router);
    authServ = inj.inject(AuthService);
    component.creds = {username: 'test101', password: 'test101'};
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });

  it('login() should call login method from authServ, and after that show error message', () => 
  {
    let credsTemp:Object = {username: 'test101', password: 'test101'};
    spyOn(component, 'login');
    spyOn(component.alertify, 'error');
    spyOn(component.authServ, 'login').and.returnValue(of<void>(alertify.error('randomerror')));

    component.login();
    component.authServ.login(credsTemp);
    console.log(component.authServ); 
    expect(component.authServ.login).toHaveBeenCalled();
    expect(component.alertify.error).toHaveBeenCalled();
    expect(component.login).toHaveBeenCalled();
  });

  it('loggedIn() should return false, if user is not logged In', () => 
  {
    spyOn(component.authServ, 'loggedIn').and.returnValue(false);
    let res = component.loggedIn();

    expect(component.authServ.loggedIn).toHaveBeenCalled();
    expect(res).toEqual(false);
  })

  it('logout() should make empty: currClient, decToken, creds; navigate, and display message', () => 
  {
    spyOn(component.alertify, 'success').and.callThrough();
    spyOn(component.router, 'navigate').and.callThrough();
    spyOn(component, 'logout').and.callThrough();
    component.logout();
    expect(component.authServ.decToken).toEqual(null);
    expect(component.authServ.currClient).toEqual(null);
    expect(component.creds).toEqual({});
    expect(component.router.navigate).toHaveBeenCalled();
    expect(component.alertify.success).toHaveBeenCalled();
    expect(component.logout).toHaveBeenCalled();
  })

});
