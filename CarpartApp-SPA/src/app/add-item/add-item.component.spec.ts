/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddItemComponent } from './add-item.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemComponent ],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldnt be able to add an item, if form is invalid', () => 
  {
    component.alertify.closeAll();
    let btn = fixture.debugElement.query(By.css('.btn.btn-info.btn-sm')).nativeElement;
    btn.click();
    expect(btn.disabled).toBeTruthy();
  });

  it('should call addProduct from custServ and confirm from alertify', () =>
  {
    spyOn(component.alertify, 'confirm').and.callThrough();
    spyOn(component.custServ, 'addProduct').and.callThrough();
    spyOn(component, 'addItem').and.callThrough();
    component.itemForm
      .setValue({
        name: 'Super fly',
        description: 'Just the plain text for testing purposes',
        price: 23.55,
        status: 'AVAILABLE'});
    // component.itemForm['name'].setValue('Super fly');
    // component.itemForm['description'].setValue('Just the plain text for testing purposes');
    // component.itemForm['price'].setValue(23.55);
   // component.itemForm['status'];
    

    let btn = fixture.debugElement.query(By.css('.btn.btn-info.btn-sm')).nativeElement;
    let form = fixture.debugElement.query(By.css('form')).nativeElement;

    // form[0].value = 'Super Fly';
    // form[1].value = 'Just the plain text for testing purposes';
    // form[2].value = '23.55';
    // form[3].value = 'IN STOCK';

    component.itemForm.controls.name.setValue('Super Fly');
    component.itemForm.controls.description.setValue('Just the plain text for testing purposes');
    component.itemForm.controls.price.setValue('23.55');
    component.itemForm.controls.status.setValue('IN STOCK');

    console.log('batonik');
    console.log(btn);
    console.log(component.itemForm);

    expect(btn.disabled).toBeTruthy();

  })
});
