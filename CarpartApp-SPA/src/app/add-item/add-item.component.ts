import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../_models/product';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  itemToAdd: Product;

  constructor(private authServ: AuthService, private alertify: AlertifyService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.initAddItemForm();
  }

  initAddItemForm()
  {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(25)]],
      price: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  addItem()
  {
    
    this.alertify.confirm(`Are you sure you want to add ${this.itemForm.value.name}?`, () =>
    {
      console.log('mockup');

      if(this.itemForm.valid)
      {
        this.itemToAdd = Object.assign({}, this.itemForm.value);
        
      }

    });
  }

}
