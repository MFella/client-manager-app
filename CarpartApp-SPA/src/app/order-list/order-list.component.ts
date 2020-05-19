import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../_models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private custServ: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe((res) => {
      console.log(res);
      this.orders = res.orders;
      //delete last order, which is 'basket'
      this.orders.pop();
      console.log(this.orders);
    })
  }

}
