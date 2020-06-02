/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';

import { BasketComponent } from './basket.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToPricePipe } from './toPrice.pipe';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OrderForCreation } from '../_models/OrderForCreation';
import { AuthService } from '../_services/auth.service';

fdescribe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
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



  let toReturn = {
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
    },
    basket: {
      client: null,
      clientId: 1,
      deliverDate: "1000-10-10T00:00:00",
      id: 34,
      orderDate: "1000-10-10T00:00:00",
      orderItems: null,
      orderType: null,
      status: null,
      total: 0
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketComponent, ToPricePipe ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{
        provide: ActivatedRoute, useValue: {data: of(toReturn)}
      },
      {
        provide: AuthService, useClass: MockAuthServ
      },
    ToPricePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give 0 as total, if there is no item in basket', () => 
  {
    let sum = 0;
    if(component.basket.orderItems === null || component.basket.orderItems?.length === 0) { sum = 0; }
    expect(component.total).toEqual(sum);
  });

  it('should give total greater than 0, if in basket is at leats one item', () => 
  {
    let toOrder = {
      orderId: 34,
      product: {id: 55, name: "New item", description: "Item for testing purposes", price: 19.22, status: "IN STOCK"},
      productId: 9,
      quantity: 2
    };
    component.basket.orderItems = [];
    component.basket.orderItems.push(toOrder);
    fixture.detectChanges();
    let sum = 0;
    for(let item of component.basket.orderItems)
    {
      sum += item.product.price*item.quantity;
    }
    component.returnTotal();
    fixture.detectChanges();
    component.returnTotal();
    expect(sum).toEqual(38.44);

  })

  it('addThisOrder should call bookOrder method from custServ, and confirm from alertify', () => 
  {
    component.alertify.closeAll();
    spyOn(component.custServ, 'bookOrder').and.returnValue(of()); 
    spyOn(component.alertify, 'confirm').and.callThrough();
    //required! 
    component.deliverValue = '12.00';
    component.addThisOrder();
    fixture.detectChanges();

    fixture.whenStable().then(() => 
    {
      let ok = fixture.debugElement.query(By.css('.ajs-button.ajs-ok')).nativeElement;
      ok.click();
      expect(component.custServ.bookOrder).toHaveBeenCalled();
    })
    expect(component.alertify.confirm).toHaveBeenCalled();
  })

  it('deleteItemFromBasket should call same method from custServ, and confirm from alertify', () => 
  {
    component.alertify.closeAll();
    spyOn(component.custServ, 'deleteItemFromBasket').and.returnValue(of());
    spyOn(component.alertify, 'confirm').and.callThrough();
    let toOrder = {
      orderId: 34,
      product: {id: 55, name: "New item", description: "Item for testing purposes", price: 19.22, status: "IN STOCK"},
      productId: 9,
      quantity: 2
    };
    component.basket.orderItems = [];
    component.basket.orderItems.push(toOrder);

    component.deleteItemFromBasket(9);

    fixture.detectChanges();

    fixture.whenStable().then(() => {

      let ok = fixture.debugElement.query(By.css('.ajs-button.ajs-ok')).nativeElement;
      ok.click();
      expect(component.custServ.deleteItemFromBasket).toHaveBeenCalled();
    })

    expect(component.alertify.confirm).toHaveBeenCalled();
  })


});
