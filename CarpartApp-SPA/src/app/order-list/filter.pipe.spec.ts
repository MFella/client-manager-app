/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FilterPipe } from './filter.pipe';
import { Order } from '../_models/order';

fdescribe('Pipe: Filter', () => {

  let dummyData: Order[] = [
    {    
      id: 1,
      clientId: 1,
      status: 'Created',
      orderType: 'Parcel',
      total: 250,
      orderDate: new Date(),
      deliverDate: new Date()
    },
    {    
      id: 2,
      clientId: 1,
      status: 'Created',
      orderType: 'Slow',
      total: 150,
      orderDate: new Date(),
      deliverDate: new Date()
    },
    {    
      id: 3,
      clientId: 1,
      status: 'Paid',
      orderType: 'Slow',
      total: 200,
      orderDate: new Date(),
      deliverDate: new Date()
    },
    {    
      id: 4,
      clientId: 2,
      status: 'Finalised',
      orderType: 'Fast',
      total: 500,
      orderDate: new Date(),
      deliverDate: new Date()
    },
    {    
      id: 5,
      clientId: 2,
      status: 'Completed',
      orderType: 'Locker',
      total: 10,
      orderDate: new Date(),
      deliverDate: new Date()
    }
  ];

  it('create an instance', () => {
    let pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should show only these orders, where total price > 140', () => 
  {
    let pipe = new FilterPipe();
    let sol = pipe.transform(dummyData, '140', '4');
    expect(sol.length).toEqual(4);
  });

  it('should show only these orders, where total price < 220', () => 
  {
    let pipe = new FilterPipe();
    let sol = pipe.transform(dummyData, '220', '5');
    expect(sol.length).toEqual(3);
  });

  it('should show only that order, where id is 1', () => 
  {
    let pipe = new FilterPipe();
    let sol = pipe.transform(dummyData, '1', '1');
    expect(sol.length).toEqual(1);
  });

  it('should show only that order, where clientId is 2', () => 
  {
    let pipe = new FilterPipe();
    let sol = pipe.transform(dummyData, '2', '2');
    expect(sol.length).toEqual(2);
  });

  it('should show orders, which have Created status', () => {
    let pipe = new FilterPipe();
    let sol = pipe.transform(dummyData, 'Created', '3');
    expect(sol.length).toEqual(2);
  })

});
