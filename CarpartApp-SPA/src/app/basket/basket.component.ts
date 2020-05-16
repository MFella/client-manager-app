import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../_models/client';
import { ToPricePipe } from './toPrice.pipe';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  deliverValue: any;
  client: Client;
  delVal: any;
  basket: any;
  total = 0;
  quantsArr: number[] = [];
  constructor(public authServ: AuthService, private route: ActivatedRoute,
              private toPrice: ToPricePipe) { }

  ngOnInit() {
    this.route.data.subscribe((resp) =>
      {
        console.log(resp.basket);
        this.client = resp.client;
        this.basket = resp.basket;
      });
    this.returnTotal();

    for (const item of this.basket.orderItems) {
        this.quantsArr.push(item.quantity);
      }

  }

  status() {
    this.delVal = this.toPrice.transform(this.deliverValue);
     console.log(this.delVal);
     this.returnTotal();
  }

  isFullDetailed() {

    if (this.client.city.length < 2 || this.client.country.length < 2 ||
        this.client.postcode.length < 2 || this.client.street.length < 2) {
          return false;
        }
    return true;
  }

  returnTotal() {
    if (this.basket.orderItems.length !== 0) {
      this.total = 0;
      setTimeout(() => {
      for (let i = 0; i < this.basket.orderItems.length; i++) {
            console.log(this.quantsArr);
            this.total += (this.basket.orderItems[i].product.price * this.quantsArr[i]);
          }
         }, 20);
    }
    if(this.delVal !== "" && this.delVal !== undefined)
    {
      this.total += parseFloat(this.delVal);
    }

  }

  showChanged(i: number) {
    console.log(this.quantsArr);
    console.log(this.delVal);
    this.returnTotal();
  }


}
