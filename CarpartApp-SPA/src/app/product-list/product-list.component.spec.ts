/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import {Location} from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';

fdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let dummyData =[
      {
        id: 3,
        name: "Engine oil",
        description: "Engine oil is used to lubricate the moving parts of the engine. Lubricants reduce the likelihood of quick abrasive wear and corrosion, and wash away dirt.",
        price: 30.70,
        status: "AVAILABLE"
    },
    {
        id: 5,
        name: "Brake fluid",
        description: "Brake fluid is a main working substance in the brake system hydraulic drive. It transmits force from the master cylinder to wheel cylinders, due to which the brake pads are pressed against the discs, and braking is performed.",
        price: 1,
        status: "IN STOCK"
    },
    {
        id:12,
        name: "Order wing",
        description: "Fenders are intended for protecting the body of the truck from mechanical damage, for example, by stones from the road surface. They are mounted over wheels mainly with nuts and bolts.",
        price: 36.88,
        status: "AVAILABLE"
    },
    {
        id: 19,
        name: "Suspension, driver cab",
        description: "Trucks are of a significant weight; therefore they are especially susceptible to roll when driven on a rough road. To reduce the dynamic effect of the road surface, cab air suspension is used in trucks. It improves road grip, ensures smooth travel of the vehicle, regardless of the road type, and maintains the optimum constant road clearance.",
        price: 76.35,
        status: "OUT OF STOCK"
    },
    {
        id: 22,
        name: "Gas Springs",
        description: "Gas springs are regulating components which are used on trucks to open and close the bonnet and also to secure it in the opened position. These devices make using, servicing and repairing trucks equipped with them easier, and also protect the bonnet from possible deformations resulting from impacts.",
        price: 19.53,
        status: "IN STOCK"
    }
    ];

  let pagination = {
    currPage: 1,
    itemsOnPage: 5,
    totItems: 5,
    totPages: 1
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule
        .withRoutes([{path: 'products/:id', component: ProductDetailComponent}]), BrowserModule],
      providers: [
      {
        provide: ActivatedRoute, useValue: {data: of({products:{ res:dummyData, pagination: pagination}, basket: {}}) }
      }
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click of info should navigate to detail page of product', async(inject([Router,Location],(router: Router, loc: Location) => 
  {
    let btn = fixture.debugElement.query(By.css('.btn.btn-primary.btn-sm.mr-2.p-0.pr-1.pl-1')).nativeElement;
    btn.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => 
    {
      expect(loc.path()).toEqual(`/products/${dummyData[0].id}`);
    })

  })));
});
