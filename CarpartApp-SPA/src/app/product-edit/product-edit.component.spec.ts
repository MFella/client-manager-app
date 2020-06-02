/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';

import { ProductEditComponent } from './product-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Product } from '../_models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../_services/auth.service';

fdescribe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  let product = {
    product:{
        id: 111,
        name: 'Casual product',
        description: 'Dummy text dummy text dummy text dummy text',
        price: 19.99,
        status: 'OUT OF STOCK'
    }
  }

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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {data: of(product)}
        },
        {
          provide: AuthService, useClass: MockAuthServ
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addItem should call updateProduct from custServ, and confirm from alertify', () => 
  {
    component.alertify.closeAll();
    let newProd = {
      id: 111,
      name: 'Casual product',
      description: 'Dummy text dummy text dummy text dummy text',
      price: 15.99,
      status: 'SMALL AMOUNT'
    };
    spyOn(component.alertify, 'confirm').and.callThrough();
    spyOn(component.custServ, 'updateProduct').and.returnValues(of(newProd));
    spyOn(component, 'addItem').and.callThrough();

    component.addItem();

    fixture.detectChanges();
    component.alertify.closeAll();

    fixture.whenStable().then(() => {
      // const ok = fixture.debugElement.query(By.css('.ajs-button.ajs-ok')).nativeElement;
      // ok.click();
      component.alertify.closeAll();
     expect(component.custServ.updateCustomer).toHaveBeenCalled(); 
     expect(component.alertify.confirm).toHaveBeenCalled();
    })
    expect(component.alertify.confirm).toHaveBeenCalled();
 //   expect(component.custServ.updateProduct).toHaveBeenCalled(); 
    expect(component.addItem).toHaveBeenCalled();

  })
});
