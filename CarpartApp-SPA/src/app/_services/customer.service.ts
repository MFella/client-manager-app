import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../_models/client';
import { Observable } from 'rxjs';
import { PagedRes } from '../_models/pagination';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backUrl = environment.backUrl;

constructor(private http: HttpClient) { }

  getCustomer(id: number): Observable<Client>
  {
    return this.http.get<Client>(this.backUrl + 'clients/' + id);
  }

  updateCustomer(id: number, client: Client)
  {
    return this.http.put(this.backUrl + 'clients/' + id, client);
  }

  getProducts(page?, itemsPerPage?): Observable<PagedRes<Product[]>>
  {
    const pagedRes: PagedRes<Product[]> = new PagedRes<Product[]>();

    let params = new HttpParams();

    if(page != null && itemsPerPage != null)
    {
      params = params.append('pageNo', page);
      params = params.append('pageSize', itemsPerPage);
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
