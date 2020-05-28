import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../_models/order';
import { AuthService } from '../_services/auth.service';
import { FormGroup } from '@angular/forms';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  pageOfOrders: Order[] = [];
  searchTerm: string;
  filterWhat: any;
  currPage: number;
  pag: Pagination;

  constructor(private custServ: CustomerService, private route: ActivatedRoute,
    public authServ: AuthService) { }

  ngOnInit() {
    this.currPage = 1;

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

  pageChanged(event: any): void {
    console.log(event);
    this.currPage = event.page;
    console.log(this.currPage)
    this.loadOrders(this.currPage);
  }

  loadOrders(page: number)
  {
    let xd = page * 10;
    console.log(this.orders.length);
    for(let y = 0; y < xd -this.orders.length && y < 10; y++)
    {
      this.pageOfOrders[y] = this.orders[y];
    }
    console.log(this.pageOfOrders);
  }

} 
 