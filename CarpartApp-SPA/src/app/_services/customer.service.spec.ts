/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Client } from '../_models/client';
import { of } from 'rxjs';
import { Product } from '../_models/product';
import { PagedRes } from '../_models/pagination';
import { AuthService } from './auth.service';
import { MethodCall } from '@angular/compiler';
import { OrderForCreation } from '../_models/OrderForCreation';
import { map } from 'rxjs/operators';
import { Order } from '../_models/order';

fdescribe('Service: Customer', () => {

  let inj: TestBed;
  let serv: CustomerService;
  let httpMock: HttpTestingController;
  let authServ: AuthService;

  let client: Client = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService, AuthService],
      imports: [HttpClientTestingModule]
    });

    inj = getTestBed();
    serv = inj.inject(CustomerService);
    httpMock = inj.inject(HttpTestingController);
    authServ = inj.inject(AuthService);
  });

  afterEach(() =>
  { // without outstanding requests
    httpMock.verify();
  });

  it('should ...', inject([CustomerService], (service: CustomerService) => {
    expect(service).toBeTruthy();
  }));

  it('getCustomer should return GET request with the customer', () => 
  {
    //serv.getCustomer = () => of(client);

    serv.getCustomer(1).subscribe(res => 
      {
        expect(res).toEqual(client);
      });
    const req = httpMock.expectOne(serv.backUrl + `clients/${1}`);
    expect(req.request.method).toBe('GET');
    req.flush(client);
  })

  it('updateCustomer should update details about customer', () => 
  {
    let newDetails = {
      city: 'Warsaw',
      country: 'Poland',
      email: 'whatever@xd.pl',
      id: 1,
      isAdmin: false,
      name: 'asdas',
      postcode: 'asda',
      street: 'Niesiolka',
      surname: 'asdasdas',
      telNo: '722153456',
      username: 'test101'
    };
    serv.updateCustomer(1, newDetails)
      .subscribe(res => 
        {
          expect(res).toEqual(newDetails);
        });
    const req = httpMock.expectOne(serv.backUrl + `clients/${newDetails.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(newDetails);
  })

  it('getProduct should return get request with product', () => 
  {
    let prod: Product = {
      id: 2,
      name: "Brake pads",
      description: "Brake pads are a part of the braking system. In many ways they determine how quickly the vehicle will stop. When the pedal is pressed, the shoe is pressed against the disc, which leads to the vehicle braking.",
      price: 23.69,
      status: "AVAILABLE"
    }

    serv.getProduct(2)
      .subscribe(res => {
        expect(res).toBe(prod);
        console.log(res);
      })

    const req = httpMock.expectOne(serv.backUrl + `products/${2}`);
    expect(req.request.method).toBe('GET');
  });

  it('getProducts should return Paged List of products', () => 
  {

    let products: PagedRes<Product[]> = {
      res: [   
              {
                  id: 7,
                  name: "Sway bar",
                  description: "Anti-roll bar is an element of the suspension of the car. The part contributes to vehicle stability when cornering, reducing body roll and softens jolting when driving on roads with low quality.",
                  price: 85.49,
                  status: "SMALL AMOUNTS"
              },
              {
                  id:8,
                  name: "Suspension arm",
                  description: "Arms are elements of the vehicle independent suspension. They serve to restrict vertical movement of the wheel.",
                  price: 72.17,
                  status: "SMALL AMOUNTS"
              },
              {
                  id: 9,
                  name: "Ball joint",
                  description: "Suspension ball joint is used to connect the wheel hub and suspension arm. Its function is to provide the ability to rotate the hub, while maintaining the position of the wheel in the horizontal plane.",
                  price: 17.10,
                  status: "SMALL AMOUNTS"
              },
              {
                  id:10,
                  name: "Anti roll bar links",
                  description: "Stabilizer bar link is a component of the vehicle suspension, the link between the sway bar and the central part of the suspension. This part prevents significant body roll when cornering.",
                  price: 22.35,
                  status: "AVAILABLE"
              }
      ], 
      pagination: 
            {
              currPage: 1,
              itemsOnPage: 4,
              totItems: 4,
              totPages: 1
            }
          };

    serv.getProducts()
        .subscribe(res => {
          expect(res).toEqual(products);
        })

    const req = httpMock.expectOne(serv.backUrl + `products`);
    expect(req.request.method).toBe('GET');
  });

  it('getBasket should been called and return GET request', () => 
  {
    spyOn(serv, 'getBasket').and.callThrough();
    serv.getBasket(1)
      .subscribe(el => 
        {
          expect(el).toBe(null);
          console.log(`From here: ${el}`);
        });
    expect(serv.getBasket).toHaveBeenCalled();
    const req = httpMock.expectOne(`${serv.backUrl}orders/basket/${1}`);
    expect(req.request.method).toBe('GET');
  });

  it('addItemToOrder should return POST request', () => 
  {
    let itemToOrder = {
        OrderId: 2,
        ProductId: 1,
        Quantity: 3
    }

    serv.addItemToOrder(1,1,itemToOrder)
      .subscribe(el => 
        {
          expect(el).toBe(itemToOrder);
        });
    const req = httpMock.expectOne(`${serv.backUrl}orders/${1}/add/${itemToOrder.ProductId}`);
    expect(req.request.method).toBe('POST');
  });
  it('bookOrder should return PUT request with OrderForCreation in body', () => 
  {
    let toCreate: OrderForCreation = {
      status: 'Created',
      orderType: 'Parcel',
      total: 20.11,
      orderDate: new Date(),
      deliverDate: new Date(),
      orderItemsId: [1,5],
      quantities: [2,6]
    }
    serv.bookOrder(1, toCreate)
      .subscribe(el => 
        {
          expect(el).toEqual(toCreate);
        })
    const req = httpMock.expectOne(`${serv.backUrl}orders/book/${1}`);
    expect(req.request.body).toEqual(toCreate);
    expect(req.request.method).toEqual('PUT');
  });

  it('deleteProduct should return POST request with productId in the body', () => 
  {
    serv.deleteProduct(1, 1)
      .subscribe(el =>
        {
          expect(el).not.toBe(undefined);
        })

    const req = httpMock.expectOne(`${serv.backUrl}products/deleteItem/${1}`);
    expect(req.request.body).toBe(1);
    expect(req.request.method).toEqual('POST');
  })
  it('changeOrderStatus should contain simple string as body in JSON and return PUT request', () =>
  {

    let order: Order = {
      id: 1,
      clientId: 2,
      status: 'Incomplete',
      orderType: 'Parcel',
      total: 204.32,
      orderDate: new Date(),
      deliverDate: new Date()
    }
    serv.changeOrderStatus(1,1,'Completed')
      .subscribe(el => 
        {
          expect(el).toEqual(order);
        })
    const req = httpMock.expectOne(`${serv.backUrl}orders/${1}/change/${1}`);
    expect(req.request.body).toBe(JSON.stringify('Completed'));
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual('PUT');
  })

  it('updateProduct should return PATCH request, and have productToUpdate in body', () => 
  {
    let updateProduct: Product = {
      id:10,
      name: "Anti roll bar links",
      description: "Stabilizer bar link is a component of the vehicle suspension, the link between the sway bar and the central part of the suspension. This part prevents significant body roll when cornering.",
      price: 22.35,
      status: "AVAILABLE"
    }
    serv.updateProduct(1,updateProduct)
      .subscribe(el => 
        {
          expect(el).toEqual(updateProduct);
        });
        
    const req = httpMock.expectOne(`${serv.backUrl}products/${1}/update/`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.responseType).toBe('json');
    expect(req.request.body).toEqual(updateProduct);
  })

});
