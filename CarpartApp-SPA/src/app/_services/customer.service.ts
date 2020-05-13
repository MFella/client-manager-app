import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../_models/client';
import { Observable, BehaviorSubject } from 'rxjs';
import { PagedRes } from '../_models/pagination';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backUrl = environment.backUrl;
  productSubj: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
  
constructor(private http: HttpClient, private authServ: AuthService) { }


  getCustomer(id: number): Observable<Client>
  {
    return this.http.get<Client>(this.backUrl + 'clients/' + id);
  }

  updateCustomer(id: number, client: Client)
  {
    this.authServ.currClient = client;
    console.log(this.authServ.currClient);
    return this.http.put(this.backUrl + 'clients/' + id, client);
  }

  getProducts(page?, itemsPerPage?, phrase?, orderBy?): Observable<PagedRes<Product[]>>
  {
    const pagedRes: PagedRes<Product[]> = new PagedRes<Product[]>();

    let params = new HttpParams();

    if(page != null && itemsPerPage != null)
    {
      params = params.append('pageNo', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if(phrase != null)
    {
      params = params.append('phrase', phrase);
    }

    if( orderBy != undefined || orderBy != null)
    {
      params = params.append('orderBy', orderBy);
    }

    return this.http.get<Product[]>(this.backUrl + 'products', { observe: 'response', params})
      .pipe(
        map((res) => {
          
          pagedRes.res = res.body;
          if(res.headers.get('Pagination') != null)
          {
            pagedRes.pagination = JSON.parse(res.headers.get('Pagination'));
          }
          return pagedRes;
        })
      );
  }

}
