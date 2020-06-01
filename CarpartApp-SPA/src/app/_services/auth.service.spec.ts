/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Client } from '../_models/client';
import { executionAsyncId } from 'async_hooks';
import { of, Observable } from 'rxjs';

fdescribe('Service: Auth', () => {
  let inj: TestBed;
  let serv: AuthService;
  let httpMock: HttpTestingController;
  let postRes: {post: jasmine.Spy};
  let mockAuthServ: AuthService;
  const exampleToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.
  eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjNjMjcwMjVkLWMyMmMtNDdjYi04
  OTlmLWUzZTYxMDgxZjkyYyIsImlhdCI6MTU5MDk2MjM4OSwiZXhwIjoxNTkwOTY1OTg5fQ.BsnvsOV_qg5KVRRS8YI3_DRAOX4VzTsH9UDzso6kFW8`;

  const fakedRes = {
    client: {
      city: 'Torun',
      country: 'Poland',
      email: 'czarekwr@wp.pl',
      id: 1,
      isAdmin: false,
      name: 'asdas',
      postcode: 'asda',
      street: 'Niesiolka',
      surname: 'asdasdas',
      telNo: '123123123',
      username: 'test101'
    },
    token: exampleToken
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });
    inj = getTestBed();
    serv = inj.inject(AuthService);
    httpMock = inj.inject(HttpTestingController);

    // inj.overrideProvider(AuthService, {useValue: fakedRes});
   // postRes = jasmine.createSpyObj('HttpClient', ['post']);
   // mockAuthServ = new AuthService(<any>postRes);
  });

  afterEach(() =>
  { // without outstanding requests
    httpMock.verify();
    localStorage.removeItem('token');

  });


  it('should create service', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('isFullDetailed should return true if current Client is full detailed', () =>
  {
    const currCli: Client = {
      id: 1,
      username: 'username',
      name: 'name',
      surname: 'surname',
      email: 'email@email.com',
      telNo: '234342212',
      country: 'England',
      city: 'Southampton',
      postcode: 'SO14 2DY',
      street: 'Dale Valley Road',
      isAdmin: false
    };
    serv.currClient = currCli;
    expect(serv.isFullDetailed()).toBeTruthy();
  });

  it('loggedIn should return false, if user is not loggedIn', () =>
  {
    // faked token
    const exampleToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.
    eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjNjMjcwMjVkLWMyMmMtNDdjYi04
    OTlmLWUzZTYxMDgxZjkyYyIsImlhdCI6MTU5MDk2MjM4OSwiZXhwIjoxNTkwOTY1OTg5fQ.BsnvsOV_qg5KVRRS8YI3_DRAOX4VzTsH9UDzso6kFW8`;
    localStorage.setItem('token', exampleToken);
    expect(serv.loggedIn()).toBeFalse();
  });

  it('register method should return post method and some data', () =>
  {
   // serv.login = () => jasmine.createSpy('login').and.returnValue(Observable.of(fakedRes));
    //const res = spyOn(serv, 'login').and.returnValue(of());

    let fakedCreds = {username: 'test101', password: 'test101'};
    let xd; 
    serv.login(fakedCreds)
      .subscribe((res) => {
        xd = res;
      });

    const req = httpMock.expectOne(serv.baseUrl + 'login');
    expect(req.request.method).toBe('POST');
    expect(xd).toBeUndefined();    // why??
  });
});  
