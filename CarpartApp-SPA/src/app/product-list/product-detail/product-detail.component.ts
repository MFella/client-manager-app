import { Component, OnInit, Input, OnDestroy, NgModule } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { CustomerService } from 'src/app/_services/customer.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: Product;
  idClient: number;
  quantity: any;

  constructor(private custServ: CustomerService, private router: Router,
    public authServ: AuthService) { }

  ngOnInit() {
    this.custServ.productSubj.subscribe((pro:Product) => {
      this.product = pro;
    });
    console.log(this.authServ.currClient);
  }

  onCancel()
  {
    this.router.navigate(['/products']);
  }

  addToBasket()
  {
    console.log(this.quantity);
  }

  ngOnDestroy()
  {
    this.custServ.productSubj.next(null);
  }
}
