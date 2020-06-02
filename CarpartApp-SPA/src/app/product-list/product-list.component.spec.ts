/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PaginationModule } from 'ngx-bootstrap/pagination/ngx-bootstrap-pagination';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let dummyData = {
    products: [
      {
        name: "Engine oil",
        description: "Engine oil is used to lubricate the moving parts of the engine. Lubricants reduce the likelihood of quick abrasive wear and corrosion, and wash away dirt.",
        price: 30.70,
        status: "AVAILABLE"
    },
    {
        name: "Brake fluid",
        description: "Brake fluid is a main working substance in the brake system hydraulic drive. It transmits force from the master cylinder to wheel cylinders, due to which the brake pads are pressed against the discs, and braking is performed.",
        price: 1,
        status: "IN STOCK"
    },
    {
        name: "Order wing",
        description: "Fenders are intended for protecting the body of the truck from mechanical damage, for example, by stones from the road surface. They are mounted over wheels mainly with nuts and bolts.",
        price: 36.88,
        status: "AVAILABLE"
    },
    {
        name: "Suspension, driver cab",
        description: "Trucks are of a significant weight; therefore they are especially susceptible to roll when driven on a rough road. To reduce the dynamic effect of the road surface, cab air suspension is used in trucks. It improves road grip, ensures smooth travel of the vehicle, regardless of the road type, and maintains the optimum constant road clearance.",
        price: 76.35,
        status: "OUT OF STOCK"
    },
    {
        name: "Gas Springs",
        description: "Gas springs are regulating components which are used on trucks to open and close the bonnet and also to secure it in the opened position. These devices make using, servicing and repairing trucks equipped with them easier, and also protect the bonnet from possible deformations resulting from impacts.",
        price: 19.53,
        status: "IN STOCK"
    }

    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserModule],
      providers: [
      {
        provide: ActivatedRoute, useValue: {data: of(dummyData)}
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
    component.pag.currPage=1;
    component.pag.itemsOnPage=5;
    component.pag.totItems=5;
    component.pag.totPages=1;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
