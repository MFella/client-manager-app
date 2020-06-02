/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductDetailComponent } from './product-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/_models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { CustomerService } from 'src/app/_services/customer.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../product-list.component';

let product: Product = {
  id: 12,
  name: 'Super fly',
  description: 'Thats the really cool superfly created only in testing purposes',
  price: 73.2,
  status: 'IN STOCK'
}
let toRes = {
  product: product,
  basket: {}
}

class MockAuthServ extends AuthService
{
  decToken = {
    exp: 2991195881,
    iat: 1591109481,
    nameid: "1",
    nbf: 1591109481,
    unique_name: "test101"
  }
  currClient = {
    city: "Torun",
    country: "Poland",
    email: "czarekwr@wp.pl",
    id: 1,
    isAdmin: false,
    name: "asdas",
    postcode: "asda",
    street: "Niesiolka",
    surname: "asdasdas",
    telNo: "123123123",
    username: "test101"
  }

}

fdescribe('ProductDetailComponent', () => {
  let inj: TestBed;
  //let authServ: AuthService;
  let custServ: CustomerService;
  let router: Router;
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule
        .withRoutes([{path: 'products', component: ProductListComponent}]), FormsModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: { data: of(toRes)}
        },
        { 
          provide: AuthService, useClass: MockAuthServ
        }, 
        AlertifyService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inj = getTestBed();
    router = inj.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('card-header should have appropriate bg class', () => 
  {
    let cardH = fixture.debugElement.nativeElement.querySelector('.card-header');
    //map with all classes
    let map = new Map();
    map.set('AVAILABLE', 'bg-success');
    map.set('IN STOCK', 'bg-primary');
    map.set('SMALL AMMOUNT', 'bg-warning');
    map.set('SMALL AMMOUNTS', 'bg-warning');
    map.set('OUT OF STOCK', 'bg-danger');
    expect(cardH.classList).toContain(map.get(product.status));
  })

  it('cancel should navigate to products list', () => 
  {
    spyOn(component["router"], 'navigate').and.callThrough();

    let btnBack = fixture.debugElement.nativeElement.querySelector('.mr-2.btn.btn-sm.btn-warning');
    btnBack.click();
    fixture.detectChanges();

    expect(component['router'].navigate).toHaveBeenCalled();
  })

  it('after changing input type number, quantity should be the same as in input',async(() => 
  {
    
    component.quantity = '4';
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('input'));
      let el = input.nativeElement;


      fixture.detectChanges();
      expect(el.value).toEqual('4');
      el.value = '9'; 
      el.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.quantity.toString()).toBe(el.value);
    })


  }))



});
