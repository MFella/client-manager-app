/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { AlertifyService } from './alertify.service';

fdescribe('Service: Alertify', () => {
  let inj: TestBed;
  let alertify: AlertifyService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertifyService]
    });
    inj = getTestBed();
    alertify = inj.inject(AlertifyService);
  });

  it('should create service', inject([AlertifyService], (service: AlertifyService) => {
    expect(service).toBeTruthy();
  }));

  it('success should call success method', () => 
  {
    spyOn(alertify, 'success');
    alertify.success('thats one small step for a man, one giant leap for mankind');
    expect(alertify.success).toHaveBeenCalled();
  });

  it('error should call error method', () => 
  {
    spyOn(alertify, 'error');
    alertify.error('Houston, we have got a problem');
    expect(alertify.error).toHaveBeenCalled();
  });

  it('warning should call access warning', () => 
  {
    spyOn(alertify, 'warning');
    alertify.warning('What are you doing?');
    expect(alertify.warning).toHaveBeenCalled();
  });

  it('message should call message method', () => 
  {
    spyOn(alertify, 'message');
    alertify.message('hi');
    expect(alertify.message).toHaveBeenCalled();
  });


});
