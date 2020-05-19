import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../_models/client';
import { ToPricePipe } from './toPrice.pipe';
import { CustomerService } from '../_services/customer.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  deliverValue: string;
  client: Client;
  delVal: any;
  basket: any;
  total = 0;
 // quantsArr: number[] = [];
  constructor(public authServ: AuthService, private route: ActivatedRoute,
              private custServ: CustomerService, private toPrice: ToPricePipe,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe((resp) => {
        
        this.client = resp.client;
        this.basket = resp.basket;
        console.log(this.basket);
      });
    this.returnTotal();

    // for (const item of this.basket.orderItems) {
    //     this.quantsArr.push(item.quantity);
    //   }

  }

  status() {
    this.delVal = this.toPrice.transform(this.deliverValue);
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
    if (this.basket.orderItems === null) {
      this.total = 0;
    } else {
        this.total = 0;
        setTimeout(() => {
        for (let i = 0; i < this.basket.orderItems.length; i++) {
            
            this.total += (this.basket.orderItems[i].product.price * this.basket.orderItems[i].quantity);
          }
         }, 1);

        if(this.delVal !== "" && this.delVal !== undefined) {
           this.total += parseFloat(this.delVal);
         }
    }


  }

  showChanged(i: number) {
    this.returnTotal();
  }

  deleteItemFromBasket(prodId: number) {
    this.alertify.confirm('Are you sure you want to delete this item?', () => {
      this.custServ.deleteItemFromBasket(this.basket.id, prodId, this.authServ.decToken.nameid)
      .subscribe(() => {
        this.basket.orderItems.splice(this.basket.orderItems.findIndex(p => p.productId === prodId), 1);
        this.returnTotal();
        this.alertify.success("An item has been removed!");
      }, err => {
        this.alertify.error("Some error occured!");
      });
    });

  }
  
  addThisOrder() {

this.alertify.confirm('Are you sure, you want place an order?', () => {
  
      let today = new Date();
      let date = today.getFullYear() + '-' + (today.getMonth()+1)+'-'+today.getDate();
      let delDate = new Date();

      if(this.deliverValue === 'Slow') {
              delDate.setDate(delDate.getDate() + Math.floor(Math.random() * 3) + 5);

          } else if(this.deliverValue === 'Fast') {
              delDate.setDate(delDate.getDate() + Math.floor(Math.random() * 3) + 3);

          } else if(this.deliverValue === 'Locker') {
              delDate.setDate(delDate.getDate() + Math.floor(Math.random() * 5) + 3);
          } else {
              delDate.setDate(delDate.getDate() + Math.floor(Math.random() * 5) + 5);
          }
      let qtys = [];
      let idies = [];
      for(let j = 0; j < this.basket.orderItems.length; j++)
        {
          qtys.push(this.basket.orderItems[j].quantity);
          idies.push(this.basket.orderItems[j].productId);
        }
      console.log(idies);
      console.log(qtys);
      let toOrder = {
        status: 'Created',
        orderType: this.deliverValue.toString(),
        total: +this.total.toFixed(2),
        orderDate: today,
        deliverDate: delDate,
        orderItemsId: idies,
        quantities: qtys
      }

      this.custServ.bookOrder(this.authServ.decToken.nameid, toOrder)
        .subscribe(() => {
          this.alertify.success("You had ordered!");
          this.deliverValue = "";
          this.delVal = 0;
          this.basket = [];
          this.total = 0;
        }, err => {
          this.alertify.error(`Something happened: ${err}`);
        })


    })

  }


}
