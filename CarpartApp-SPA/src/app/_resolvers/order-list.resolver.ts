import { Injectable } from "@angular/core";
import { CustomerService } from '../_services/customer.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Observable, of } from 'rxjs';
import { Client } from '../_models/client';
import {catchError} from 'rxjs/operators';
import { Order } from '../_models/order';


@Injectable()
export class OrderListResolver implements Resolve<Order[]> {
    constructor(private custServ: CustomerService, private router: Router,
        private alertify: AlertifyService, private authServ: AuthService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Order[]>
        {
            return this.custServ.getOrders().pipe(
                catchError(err => {
                    this.alertify.error('Issue occured(during retriving data)');
                    this.router.navigate(['/products']);
                    return of(null);
                })
            )
        }
}