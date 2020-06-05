/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let inj: TestBed;
  let mockRouter: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([{
        path: 'products', component: ProductListComponent
      }])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    inj = getTestBed();
    mockRouter = inj.inject(Router);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to product page', () => 
  {
    spyOn(component, 'cancel');
    //spyOn(component['router'], 'navigate');

    let btn = fixture.debugElement.query(By.css('.btn.btn-danger')).nativeElement;
    btn.click();
    fixture.detectChanges();

    expect(component.cancel).toHaveBeenCalled();
    //expect(component['router'].navigate).toHaveBeenCalled();
  });

});
