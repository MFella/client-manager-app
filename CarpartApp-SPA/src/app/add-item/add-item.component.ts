import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../_models/product';
import { CustomerService } from '../_services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  itemToAdd: Product;

  constructor(public authServ: AuthService, public alertify: AlertifyService,
    private fb: FormBuilder, public custServ: CustomerService,
    private router: Router) { }

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
        console.log(this.itemToAdd);
        this.custServ.addProduct(this.itemToAdd, this.authServ.decToken.nameid)
          .subscribe((res: Product) => 
          {
            this.alertify.success(`The ${res.name} has been added`);
            this.router.navigate(['/products', res.id]);
          }, err => {
            this.alertify.error(`Adding the new item went wrong. Check every input.`);
          });
      }

    });
  }

}
