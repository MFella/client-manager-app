import { Injectable } from "@angular/core";
import { CustomerService } from '../_services/customer.service';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Product } from '../_models/product';
import { AlertifyService } from '../_services/alertify.service';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PagedRes } from '../_models/pagination';

@Injectable()
export class ProductListResolver implements Resolve<Product[]> {
    
    constructor(private custServ: CustomerService, private alertify: AlertifyService,
        private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        return this.custServ.getProducts(1, 5).pipe(
            catchError(err => {
                this.alertify.error('Problem with retriving the data');
                return of(null);
            })
        )
    }    
}