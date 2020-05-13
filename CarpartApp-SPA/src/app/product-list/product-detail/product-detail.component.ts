import { Component, OnInit, Input, OnDestroy, NgModule } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { CustomerService } from 'src/app/_services/customer.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonModule } from '@angular/common';
import { AlertifyService } from 'src/app/_services/alertify.service';


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
    public authServ: AuthService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.quantity = '0';
    this.custServ.productSubj.subscribe((pro:Product) => {
      if(pro == null) {
        //work around...
        this.route.data.subscribe((res) => {
          
          if(res.product == null)
          {
            this.alertify.error('Product doesnt exists!');
            this.router.navigate(['/products']);
          }
          this.product = res.product;
        })
      } else {
        this.product = pro;
      }
    });

  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  addToBasket() {
    console.log(this.quantity);
  }

  ngOnDestroy() {

    this.custServ.productSubj.next(null);
  }
}
