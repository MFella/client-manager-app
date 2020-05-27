import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../_models/order';
import { AuthService } from '../_services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  searchTerm: FormGroup;
  filterWhat: any;

  constructor(private custServ: CustomerService, private route: ActivatedRoute,
    private authServ: AuthService) { }

  ngOnInit() {

    this.route.data.subscribe((res) => {
      this.orders = res.orders;
      this.filterWhat = "3";
      //delete last order, which is 'basket'
      console.log(res);
      if(!this.authServ.currClient.isAdmin)
      {
        this.orders.pop();
      }

    })
  }

}
