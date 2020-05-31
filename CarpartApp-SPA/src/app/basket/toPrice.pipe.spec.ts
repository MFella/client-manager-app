/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ToPricePipe } from './toPrice.pipe';

fdescribe('Pipe: ToPrice', () => {
  it('create an instance', () => {
    let pipe = new ToPricePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return 9.00, for Slow option', () => {
    let pipe = new ToPricePipe();
    let myPrice = pipe.transform('Slow');
    expect(myPrice).toEqual('9.00');
  });
  it('should return 15.00, for Fast option', () => {
    let pipe = new ToPricePipe();
    let myPrice = pipe.transform('Fast');
    expect(myPrice).toEqual('15.00');
  });
  it('should return 12.00, for Locker option', () => {
    let pipe = new ToPricePipe();
    let myPrice = pipe.transform('Locker');
    expect(myPrice).toEqual('12.00');
  });
  it('should return nothing, for other option', () => {
    let pipe = new ToPricePipe();
    let myPrice = pipe.transform('Collection');
    expect(myPrice).toEqual('');
  });
});
