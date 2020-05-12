import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { CustomerService } from 'src/app/_services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: Product;
  
  constructor(private custServ: CustomerService, private router: Router) { }

  ngOnInit() {
    this.custServ.productSubj.subscribe((pro:Product) => {
      this.product = pro;
    });
    console.log(typeof(this.product.status));

  }

  onCancel()
  {
    this.router.navigate(['/products']);
  }


  ngOnDestroy()
  {
    this.custServ.productSubj.next(null);
  }
}
