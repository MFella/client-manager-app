/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MultiplyPipe } from './multiply.pipe';

fdescribe('Pipe: Multiply', () => {
  it('create an instance', () => {
    let pipe = new MultiplyPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return 0, if value is 0, or multiplier is 0', () => 
  {
    let pipe = new MultiplyPipe();
    let multiplied = pipe.transform(0, 10);
    expect(multiplied).toEqual(0);
    multiplied = pipe.transform(10,0);
    expect(multiplied).toEqual(0);
    multiplied = pipe.transform(0,0);
    expect(multiplied).toEqual(0);
  })

  it('should return 150, if value if 15 and multiplier if 10', () => 
  {
    let pipe = new MultiplyPipe();
    let multiplied = pipe.transform(15,10);
    expect(multiplied).toEqual(150);
  })
  it('should return digit with appropriate accuracy', () => 
  {
    let pipe = new MultiplyPipe();
    let multiplied = pipe.transform(14.009,10);
    expect(multiplied).toBeCloseTo(140.08, 1);
    multiplied = pipe.transform(13.99, 15);
    expect(multiplied).toBeCloseTo(209.82, 1);
  })

});
