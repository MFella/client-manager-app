/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { OrderListComponent } from './order-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from './filter.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Order } from '../_models/order';
import { AuthService } from '../_services/auth.service';
import { Client } from '../_models/client';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { FormsModule } from '@angular/forms';

import {Location} from '@angular/common';

fdescribe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;


  class MockAuthServ extends AuthService{
    isAdmin = false;
    currClient = client;
  }
  let client: Client = {
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
  let mockUpOrders = {
    orders: [{
      id: 1,
      clientId: 1,
      status: 'Paid',
      orderType: 'Parcel',
      total: 0,
      orderDate: new Date(),
      deliverDate: new Date()
    },
    {
      id: 2,
      clientId: 1,
      status: 'Created',
      orderType: 'Fast',
      total: 0,
      orderDate: new Date(),
      deliverDate: new Date()
    },
    {
      id: 3,
      clientId: 1,
      status: 'Finalised',
      orderType: 'Slow',
      total: 0,
      orderDate: new Date(),
      deliverDate: new Date()
    }
  ]};


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListComponent, FilterPipe, OrderDetailComponent],
      // tslint:disable-next-line: max-line-length
      imports: [HttpClientTestingModule, CommonModule, RouterTestingModule
        .withRoutes([
          {path:'orders/:id', component: OrderDetailComponent}
        ]), 
        FormsModule],
      providers:[
        {
          provide: ActivatedRoute, useValue: {
            data: of(mockUpOrders)
          }
        },
        {
          provide: AuthService, useClass: MockAuthServ
        },
        // {
        //   provide: Location
        // }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to order-detail(id=1) page after clicking right arrow',
  async(inject([Router, Location],(router, location: Location) => 
  {
    spyOn(router, 'navigate');
    const button = fixture.debugElement.nativeElement.querySelector('.mr-0.position-relative');
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toEqual('/orders/1');
    });
  })));

});
