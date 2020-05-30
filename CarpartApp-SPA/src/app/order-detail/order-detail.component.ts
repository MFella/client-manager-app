import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { OrderItem } from '../_models/orderItem';
import { FormControl } from '@angular/forms';
import { CustomerService } from '../_services/customer.service';
import { Order } from '../_models/order';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

order: any;
client: any;
orderItems: any;
selectRef: FormControl;

  constructor(private route: ActivatedRoute, public authServ: AuthService,
    private custServ: CustomerService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    
    this.route.data.subscribe((el: any) => 
    { 
      this.order = el.order.orderToRet;
      this.client = el.order.clientToRet;
      this.orderItems = el.order.orderItems;
      this.selectRef = this.order.status;
    });
  }

  saveChanges()
  {
    const xd = this.selectRef.toString();
    this.custServ.changeOrderStatus(this.authServ.decToken.nameid, this.order.id, xd)
      .subscribe((order: Order) =>
      {
        this.alertify.success(`The status of order number: ${order.id} has
         been updated on ${order.status}`);
         this.router.navigate(['/orders']);
      }, err => 
      {
        this.alertify.error(`Something went wrong`);
      })
  }
}
