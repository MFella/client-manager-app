import { Injectable } from "@angular/core";
import { CustomerService } from '../_services/customer.service';
import { Resolve, ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Product } from '../_models/product';
import { AlertifyService } from '../_services/alertify.service';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class BasketResolver implements Resolve<Product> {
    
    constructor(private custServ: CustomerService, private alertify: AlertifyService,
        private router: Router, private authServ: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.custServ.getBasket(this.authServ.decToken.nameid).pipe(
            catchError(err => {
                this.alertify.error('Problem with retriving the data');
                return of(null);
            })
        )
    }    
}