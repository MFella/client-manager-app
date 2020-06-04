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
  currPage: number = 1;
  pag: Pagination;

  constructor(private custServ: CustomerService, private route: ActivatedRoute,
    public authServ: AuthService) { }

  ngOnInit() {
    
    this.route.data.subscribe((res) => {
      //this.orders = res.orders;
      for(let item of res.orders)
      {
        if(item.status !== null)
        {
          this.orders.push(item);
        }
      }
      this.pageOfOrders = this.orders.slice(0, 10);
      this.filterWhat = "3";

      console.log(res);
      console.log(this.authServ.currClient.isAdmin);

    })
  }

  pageChanged(event: any): void {
    this.currPage = event.page;
    this.pageOfOrders = this.orders.slice((event.page-1)*event.itemsPerPage, (event.page)*event.itemsPerPage);
  }

  loadOrders(page: number)
  {
    let xd = page * 10;
    let tempOrders = this.orders.splice(xd, xd+10);
    console.log(tempOrders);
    // for(let y = 0; y < xd -this.orders.length && y < 10; y++)
    // {
    //   this.pageOfOrders[y] = this.orders[y];
    // }
    // console.log(this.pageOfOrders);
  }

} 
 