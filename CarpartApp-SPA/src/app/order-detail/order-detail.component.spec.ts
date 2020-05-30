/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { OrderDetailComponent } from './order-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToPricePipe } from '../basket/toPrice.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Order } from '../_models/order';
import { OrderItem } from '../_models/orderItem';
import { Client } from '../_models/client';
import { AuthService } from '../_services/auth.service';
import { CustomerService } from '../_services/customer.service';
import { HttpClient } from '@angular/common/http';

fdescribe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  let router: Router;
  let authServ: AuthService;
  let custServ: CustomerService;
  let spy: any;

  class MockAuthServ extends AuthService{
    isAdmin = false;
    currClient = client;
  }
  class MockCustServ extends CustomerService{

  }

  let oneOrder: Order = {
        id: 1,
        clientId: 2,
        status: 'Completed',
        orderType: 'Locker',
        total: 12,
        orderDate: new Date(),
        deliverDate: new Date()
};
  let orderItems: OrderItem[] = [];
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

  let toMockUp = {
    order: {
      orderItems: orderItems,
      clientToRet: client,
      orderToRet: oneOrder
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailComponent, ToPricePipe ],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            data: of(toMockUp)
          }
        },
        {
          provide: AuthService, useClass: MockAuthServ
        },
        {
          provide: CustomerService, useClass: MockCustServ
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    let authServ = TestBed.inject(AuthService);
    let custServ = TestBed.inject(CustomerService);
    authServ.currClient.isAdmin = true;
    //let authServ = TestBed.get(AuthService);

    fixture.detectChanges();
  });

  it('should be readly initialized', () => {
      //authServ.currClient.isAdmin = false;

    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });

  it('saveChanges() should have been called after click of button, retrieve data, and navigate to orders page', () => 
  {
    spyOn(component, 'saveChanges');

    //set 'observable' for function
    component['custServ'].changeOrderStatus = () => of(oneOrder);
    spyOn(component['custServ'], 'changeOrderStatus').and.callThrough();
    spyOn(component['router'], 'navigate').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('.btn.btn-info.btn-sm');
    component.order.status = 'Picking';

    fixture.detectChanges();
    //button after this is enabled
    expect(button.disabled).toBeFalsy();
    button.click();
    expect(component.saveChanges).toHaveBeenCalled();

    component['custServ'].changeOrderStatus(1, oneOrder.id, component.order.status)
    .subscribe(el => 
      {
        //response should be an object
        expect(el).toBeInstanceOf(Object);
        component['router'].navigate(['/orders']);
      });

    expect(component['custServ'].changeOrderStatus).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalled();
  });



});
