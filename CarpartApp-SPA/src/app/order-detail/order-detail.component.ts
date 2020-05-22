import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { OrderItem } from '../_models/orderItem';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

order: any;
client: any;
orderItems: any;

  constructor(private route: ActivatedRoute, public authServ: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe((el: any) => 
    {
      this.order = el.order.orderToRet;
      this.client = el.order.clientToRet;
      this.orderItems = el.order.orderItems;
      console.log(el.order);
    });
  }

}
