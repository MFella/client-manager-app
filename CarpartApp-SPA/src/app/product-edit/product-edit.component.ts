import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Product } from '../_models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../_services/customer.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  itemForm: FormGroup;
  product: Product;

  constructor(private route: ActivatedRoute, public alertify: AlertifyService,
    private router: Router, private fb: FormBuilder, public custServ: CustomerService,
    private authServ: AuthService) { }

  ngOnInit() {
    this.initEditItemForm();
    this.route.data.subscribe((prod) => 
    { 
      this.product = prod.product;
    }, err =>
    {
        this.alertify.error("Cant retrieve the data");
        this.router.navigate(['/products']);
    })
  }

  initEditItemForm()
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

    this.alertify.confirm("Are you sure, you want to edit this product?", () => 
    {
      this.custServ.updateProduct(this.authServ.decToken.nameid, this.product)
      .subscribe(el => 
        {
          this.alertify.success(`Product ${this.product.name} has been updated successfully!`);
          this.router.navigate(['/products']);
        }, err => 
        {
          this.alertify.error(`Something happened during retriving the data!`);
        })
    })

  }

}
