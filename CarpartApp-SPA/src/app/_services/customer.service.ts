import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Client } from '../_models/client';
import { Observable, BehaviorSubject } from 'rxjs';
import { PagedRes } from '../_models/pagination';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Order } from '../_models/order';
import { OrderItem } from '../_models/orderItem';
import { OrderForCreation } from '../_models/OrderForCreation';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backUrl = environment.backUrl;
  //productSubj: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
  
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

  getProduct(id: number)
  {
    return this.http.get<Product>(this.backUrl + 'products/' + id);
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

  getOrders(isAdmin: boolean)
  {
    // without header - Error 415;
    // Probably type was 'test', but not 'application/json'
    const headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  }
    return this.http.post<Order[]>(this.backUrl + 'orders/' + this.authServ.decToken.nameid, isAdmin, headers);
  }

  getOrder(id: number, isAdmin: boolean)
  {
    const headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
    })
  };
    return this.http.post<any>(this.backUrl + 'orders/' + this.authServ.decToken.nameid + '/' + id, isAdmin, headers);
  }
  getBasket(clientId: number)
  {
    return this.http.get<any>(this.backUrl + 'orders/basket/' + clientId);
  }

  addItemToOrder(clientId: number, productId: number, orderItem: any)
  {
    return this.http.post<any>
    (`${this.backUrl}orders/${clientId}/add/${productId}`, orderItem);
  }

  deleteItemFromBasket(orderId: number, productId: number, clientId: number)
  {
    return this.http.post<any>(`${this.backUrl}orders/${clientId}/${orderId}/delete/${productId}`, {});
  }

  bookOrder(clientId: number, toOrder: OrderForCreation)
  {
    return this.http.put<OrderForCreation>(`${this.backUrl}orders/book/${clientId}`, toOrder);
  }

  addProduct(productToAdd: Product, clientId: number)
  {
    return this.http.post<Product>(`${this.backUrl}products/addItem/${clientId}`, productToAdd);
  }

  deleteProduct(productId: number, clientId: number)
  {
    return this.http.post<Product>(`${this.backUrl}products/deleteItem/${clientId}`, productId);
  }

  changeOrderStatus(clientId: number, orderId: number, newStatus: string)
  {
    const headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
    })};
    console.log(`this is ${newStatus}`)
    return this.http.put<Order>(`${this.backUrl}orders/${clientId}/change/${orderId}`, 
    JSON.stringify(newStatus), headers);
  }

  updateProduct(clientId: number, productForUpdate: Product)
  {
    return this.http.patch<Product>(`${this.backUrl}products/${clientId}/update/`
    , productForUpdate);
  }

}
