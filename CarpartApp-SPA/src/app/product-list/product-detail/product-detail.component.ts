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
    console.log((this.authServ.currClient == undefined || this.quantity == '0' || this.quantity == undefined));
    }

    deleteItem()
    {
      this.alertify.confirm(`Are you sure you want delete ${this.product.name}?`, () => {
        this.custServ.deleteProduct(this.product.id, this.authServ.decToken.nameid)
          .subscribe(el => 
            {
              this.alertify.success(`Item has been removed!`);
              this.router.navigate(['/products']);
            }, err => 
            {
              this.alertify.error("Cant remove item. Try do this later");
              this.router.navigate(['/products']);
            });
      })

    }
    setInput()
    {
      this.quantity='4';
    }


  ngOnDestroy(){
  }
}
