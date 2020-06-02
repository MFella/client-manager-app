/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';

import { ClientDetailComponent } from './client-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Client } from '../_models/client';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { CustomerService } from '../_services/customer.service';

fdescribe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;

  @Injectable()
  class MockAuthServ extends AuthService
  {
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
      exp: 1991206884,
      iat: 1591120484,
      nameid: "1",
      nbf: 1591120484,
      unique_name: "test101"
    };
  }

  @Injectable()
  class MockCustomerServ extends CustomerService
  {
    updateCustomer()
    {
      return of(client);
    }
  }

  let client = {
      client: {
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
      }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute, useValue:{ data: of(client)}
        },
        {
          provide: CustomerService, useClass: MockCustomerServ
        },
        {
          provide: AuthService, useClass: MockAuthServ
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update customer', () => 
  {
    let newClient: Client = {
              id: 1,
            username: 'test101',
            name: 'Ringo',
            surname: 'Starr',
            email: 'casula@gmail.com',
            telNo: '312312332',
            country: 'Israel',
            city: 'Jerusalem',
            postcode: 'a-223-a',
            street: 'Al Wazzan St',
            isAdmin: false
    }
    component.client = newClient;
    
    spyOn(component.authServ, 'assignCurrClient');
    spyOn(component.custServ, 'updateCustomer').and.returnValue(of(newClient));
    spyOn(component, 'updateCustomer').and.callThrough();
    component.updateCustomer();


    expect(component.updateCustomer).toHaveBeenCalled();
    expect(component.authServ.assignCurrClient).toHaveBeenCalled();
    expect(component.custServ.updateCustomer).toHaveBeenCalled();
    expect(component.authServ.currClient).toEqual(newClient);
  })
});
