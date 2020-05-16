import { Component, OnInit, Input, OnDestroy, NgModule } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { CustomerService } from 'src/app/_services/customer.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertifyService } from 'src/app/_services/alertify.service';
import {OrderItem} from '../../_models/orderItem';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: Product;
  idClient: number;
  basketId: number;
  quantity: any;

  constructor(private custServ: CustomerService, private router: Router,
              public authServ: AuthService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.quantity = '1';
        //work around...
    this.route.data.subscribe((res) => {
          if(res.product == null)
          {
            this.alertify.error('Product doesnt exists!');
            this.router.navigate(['/products']);
          }
          console.log(res);
          this.product = res.product;
          this.basketId = res.basket?.id;
        });
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  addToBasket() {

    let itemToBasket = {
      OrderId: this.basketId,
      ProductId: this.product.id,
      quantity: this.quantity
    }
    this.custServ.addItemToOrder(this.authServ.decToken.nameid, this.product.id, [itemToBasket])
      .subscribe(() => {
        this.alertify.success("The item has been added to your basket!");
        this.router.navigate(['/products']);
      }, err => 
      {
        this.alertify.error("Item is already in your basket");
      })
  }


  ngOnDestroy() {

    
  }
}
